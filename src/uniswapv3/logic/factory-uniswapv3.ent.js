/**
 * @fileoverview Queries a factory for existing LPs using a token pair for
 *    Uni V3.
 */

const contractProviderUniv3 = require('./contract-provider.ent');
const { FEES } = require('../constants/fees.const');
const { NOT_FOUND } = require('../../constants/address.const');

const entity = (module.exports = {});

/**
 * Queries a factory for existing LPs using a token pair for Uni V3.
 *
 * @param {string} factoryAddress The factory address.
 * @param {Object} provider The provider to use.
 * @param {Array<Object>} tokenPair The token pair to look for.
 * @return {Promise<Array<string>|void>} A promise with liquidity pools or empty.
 */
entity.queryFactoryForLPUniV3 = async (factoryAddress, provider, tokenPair) => {
  const contract = contractProviderUniv3.getFactoryContract(
    factoryAddress,
    provider,
  );

  const [token0, token1] = tokenPair;

  const res = await Promise.allSettled([
    contract.getPool(token0.address, token1.address, FEES.LOW),
    contract.getPool(token0.address, token1.address, FEES.MEDIUM),
    contract.getPool(token0.address, token1.address, FEES.HIGH),
  ]);

  const lpAddresses = await entity._clearResults(res);

  return lpAddresses;
};

/**
 * Will clean out LP results and format them.
 *
 * @param {Array<Object>} res The LP raw results from the allSettled.
 * @return {Array<string>} Clean up raw result and return an array of lp addresses.
 * @private
 */
entity._clearResults = async (res) => {
  const lpAddressesSuccess = res.filter((lpRes) => {
    if (lpRes.status !== 'fulfilled') {
      return false;
    }

    if (lpRes.value === NOT_FOUND) {
      return false;
    }

    return true;
  });

  const lpAddresses = lpAddressesSuccess.map((lpRes) => {
    return lpRes.value;
  });

  return lpAddresses;
};
