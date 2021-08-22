/**
 * @fileoverview On-chain data of a pair of tokens from a liquidity pool.
 */

const { getToken } = require('./get-token.ent');

const entity = (module.exports = {});

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
