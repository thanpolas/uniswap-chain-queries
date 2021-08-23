/**
 * @fileoverview Gets the token decimals of a pair of tokens on a liquidity pool.
 *    Data is fetched on-chain, the ABI for Uniswap V2 and V3 is exactly
 *    the same for this function.
 */

const { getLPTokensData } = require('./get-lp-token-data.ent');

const entity = (module.exports = {});

/**
 * Gets the token decimals of a pair of tokens on a liquidity pool.
 *
 * @param {Object} lpContract LPs ether.js contract instance.
 * @param {Object} provider Ether.js provider instance.
 * @param {Array<string|number>=} optTokenDecimals Optionally define the token0
 *    and token1 decimals, if not, they will be fetched.
 * @return {Promise<Array<string|number>>} A promise with an array tuple
 *    containing the decimals of the tokens.
 */
entity.getLPTokenDecimals = async (lpContract, provider, optTokenDecimals) => {
  // check if upstream defined the decimals
  if (Array.isArray(optTokenDecimals) && optTokenDecimals.length === 2) {
    return optTokenDecimals;
  }

  // decimals not defined, fetch them.
  const [token0Data, token1Data] = await getLPTokensData(lpContract, provider);

  const decimals = [token0Data.decimals, token1Data.decimals];

  return decimals;
};
