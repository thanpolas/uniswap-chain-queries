/**
 * @fileoverview Fetches on-chain reserves for uniswap v2 liquidity pools and
 * calculates prices.
 */

const { toAuto } = require('@thanpolas/crypto-utils');

const { getLPContract } = require('./contract-provider.ent');
const { getToken } = require('../../erc20tokens');

const entity = (module.exports = {});

/**
 * Will fetch LP Contract reserves and calculate the appropriate price for the
 * LP Pair.
 *
 * @param {string} lpAddress the LP address.
 * @param {Object} provider The provider to use.
 * @param {Array<string|number>=} optTokenDecimals Optionally define the token0
 *    and token1 decimals, if not, they will be fetched.
 * @return {Promise<Object>} A promise with the price and LP size.
 */
entity.getPriceUniswapV2 = async (lpAddress, provider, optTokenDecimals) => {
  const lpContract = getLPContract(lpAddress, provider);

  const { _reserve0: token0Reserves, _reserve1: token1Reserves } =
    await lpContract.getReserves();

  const [token0Decimals, token1Decimals] =
    await entity._getLiquidityPoolTokenDecimals(
      lpContract,
      provider,
      optTokenDecimals,
    );

  // Get the price
  const fraction = [token0Reserves, token1Reserves];
  const fractionRev = [token1Reserves, token0Reserves];
  const price = toAuto(fraction);
  const priceFormatted = toAuto(fraction, null, true);
  const priceRev = toAuto(fractionRev);
  const priceRevFormatted = toAuto(fractionRev, null, true);

  const token0ReservesFormatted = new Intl.NumberFormat('en-US').format(
    token0Reserves,
  );
  const token1ReservesFormatted = new Intl.NumberFormat('en-US').format(
    token1Reserves,
  );

  return {
    price,
    priceFormatted,
    priceRev,
    priceRevFormatted,
    token0Reserves,
    token1Reserves,
    token0ReservesFormatted,
    token1ReservesFormatted,
    lpAddress,
  };
};

/**
 * Will return data of the tokens comprizing the liquidity pool from chain,
 * wrapper for getLiquidityPoolTokensRaw, instantiating the LP contract.
 *
 * @param {string} lpAddress the LP address.
 * @param {Object} provider The provider to use.
 * @return {Promise<Array<Object>>} A promise with an array tuple containing
 *    the token objects.
 */
entity.getLiquidityPoolTokensByLpAddress = async (lpAddress, provider) => {
  const lpContract = getLPContract(lpAddress, provider);

  const tokens = await entity.getLiquidityPoolTokensData(lpContract, provider);

  return tokens;
};

/**
 * Will fetch the token data of the liquidity pool.
 *
 * @param {Object} lpContract LPs ether.js contract instance.
 * @param {Object} provider Ether.js provider instance.
 * @return {Promise<Array<Object>>} A promise with an array tuple containing
 *    the token objects.
 */
entity.getLiquidityPoolTokensData = async (lpContract, provider) => {
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

/**
 * Will format the price to human readable format.
 *
 * @param {number} price The price to format.
 * @return {string} Formatted price.
 */
entity._formatPrice = (price) => {
  let priceFixed = price;
  if (price > 2) {
    priceFixed = price.toFixed(2);
    priceFixed = new Intl.NumberFormat('en-US').format(priceFixed);
  }

  return priceFixed;
};

/**
 *
 * @param {Object} lpContract LPs ether.js contract instance.
 * @param {Object} provider Ether.js provider instance.
 * @param {Array<string|number>=} optTokenDecimals Optionally define the token0
 *    and token1 decimals, if not, they will be fetched.
 * @return {Promise<Array<string|number>>} A promise with an array tuple
 *    containing the decimals of the tokens.
 * @private
 */
entity._getLiquidityPoolTokenDecimals = async (
  lpContract,
  provider,
  optTokenDecimals,
) => {
  // check if upstream defined the decimals
  if (Array.isArray(optTokenDecimals) && optTokenDecimals.length === 2) {
    return optTokenDecimals;
  }

  // decimals not defined, fetch them.
  const [token0Data, token1Data] = await entity.getLiquidityPoolTokensData(
    lpContract,
    provider,
  );

  const decimals = [token0Data.decimals, token1Data.decimals];

  return decimals;
};
