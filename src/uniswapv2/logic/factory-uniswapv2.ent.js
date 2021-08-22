/**
 * @fileoverview Queries a factory for existing LPs using a token pair for
 *    UniswapV2 clones.
 */

const { NOT_FOUND } = require('../../constants/address.const');
const { getFactoryContract } = require('./contract-provider.ent');

const entity = (module.exports = {});

/**
 * Queries a factory for existing LPs using a token pair for UniswapV2 clones.
 *
 * @param {string} factoryAddress The factory address.
 * @param {Object} provider The provider to use.
 * @param {Array<string>} tokenPair Array tuple with addresses of the token
 *    pair to look for.
 * @return {Promise<Array<string|void>>} A promise with an array containing
 *    a single liquidity pool address or empty, array required for normalization
 *    of API.
 */
entity.queryFactoryForLPuniswapv2 = async (
  factoryAddress,
  provider,
  tokenPair,
) => {
  const contract = getFactoryContract(factoryAddress, provider);

  const [token0, token1] = tokenPair;

  let lpAddress;
  try {
    lpAddress = await contract.getPair(token0.address, token1.address);
  } catch (ex) {
    return [];
  }

  if (lpAddress === NOT_FOUND) {
    return [];
  }

  return [lpAddress];
};
