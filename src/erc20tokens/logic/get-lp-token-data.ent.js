/**
 * @fileoverview On-chain data of a pair of tokens from a liquidity pool.
 */

// don't spread so it's mockable for testing.
const contractProviderUniv2 = require('../../uniswapv2');
const { getToken } = require('./get-token.ent');

const entity = (module.exports = {});

/**
 * Will return data of the tokens comprizing the liquidity pool from chain,
 * wrapper for getLPTokensData, instantiating the LP contract.
 *
 * @param {string} lpAddress the LP address.
 * @param {Object} provider The provider to use.
 * @return {Promise<Array<Object>>} A promise with an array tuple containing
 *    the token objects.
 */
entity.getLPTokensByLpAddress = async (lpAddress, provider) => {
  const lpContract = contractProviderUniv2.getLPContract(lpAddress, provider);

  const tokens = await entity.getLPTokensData(lpContract, provider);

  return tokens;
};

/**
 * On-chain data of a pair of tokens from a liquidity pool.
 *
 * @param {Object} lpContract LPs ether.js contract instance.
 * @param {Object} provider Ether.js provider instance.
 * @return {Promise<Array<Object>>} A promise with an array tuple containing
 *    the token objects.
 */
entity.getLPTokensData = async (lpContract, provider) => {
  const [token0Address, token1Address] = await Promise.all([
    lpContract.token0(),
    lpContract.token1(),
  ]);
  const tokens = await Promise.all([
    getToken(token0Address, provider),
    getToken(token1Address, provider),
  ]);

  return tokens;
};
