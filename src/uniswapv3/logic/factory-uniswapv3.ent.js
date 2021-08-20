/**
 * @fileoverview Queries a factory for existing LPs using a token pair for
 *    Uni V3.
 */

const { ethers } = require('ethers');

const { getProvider } = require('../../../ether.service');
const { FEES } = require('../constants/fees.const');
const { NOT_FOUND } = require('../../../constants/common-tokens.const');
const { asyncMapCap } = require('../../../../../utils/helpers');

const log = require('../../../../../services/log.service').get();

const entity = (module.exports = {});

/**
 * Queries a factory for existing LPs using a token pair for kyber.
 *
 * @param {Object} factory The factory constant object.
 * @param {Object} network An item from the network constants.
 * @param {Array<Object>} tokenPair The token pair to look for.
 * @return {Promise<string|void>} A promise with liquidity pool or empty.
 */
entity.queryFactoryForLPuniswapv3 = async (factory, network, tokenPair) => {
  const provider = getProvider(network);

  const abi = factory.abi.abiFactory;

  const contract = new ethers.Contract(factory.address, abi, provider);

  const [token0, token1] = tokenPair;

  const lps = await Promise.allSettled([
    contract.getPool(token0.address, token1.address, FEES.LOW),
    contract.getPool(token0.address, token1.address, FEES.MEDIUM),
    contract.getPool(token0.address, token1.address, FEES.HIGH),
  ]);

  const lpAddresses = await entity._clearResults(lps);

  return lpAddresses;
};

/**
 * Will clean out LP results and format them.
 *
 * @param {Array<Object>} lps The LP raw results from the allSettled.
 * @param {Object} factory The factory local object.
 * @return {Array<Object>} Properly formatted object of LPs.
 * @private
 */
entity._clearResults = async (lps, factory) => {
  const errorsFound = [];
  const lpAddressesSuccess = lps.filter((lpRes) => {
    if (lpRes.status !== 'fulfilled') {
      errorsFound.push(lpRes.value);
      return false;
    }

    if (lpRes.value === NOT_FOUND) {
      return false;
    }

    return true;
  });

  await asyncMapCap(errorsFound, async (error) => {
    await log.warn(
      '_clearResults() :: Failed to query Uni V3 factory for LPs',
      {
        error,
        relay: true,
      },
    );
  });

  const lpAddresses = lpAddressesSuccess.map((lpRes) => {
    return {
      address: lpRes.value,
      factory,
    };
  });

  return lpAddresses;
};
