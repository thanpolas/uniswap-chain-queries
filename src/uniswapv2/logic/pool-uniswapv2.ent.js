/**
 * @fileoverview Fetches on-chain reserves for uniswap v2 liquidity pools and
 * calculates prices.
 */

const { poolTokensToAuto } = require('@thanpolas/crypto-utils');

const { getLPContract } = require('./contract-provider.ent');
const { getLPTokensData } = require('../../erc20tokens');

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

  const tokenDecimalsTuple = await entity._getLiquidityPoolTokenDecimals(
    lpContract,
    provider,
    optTokenDecimals,
  );

  // Get the price
  const fraction = [token0Reserves, token1Reserves];

  const price = poolTokensToAuto(fraction, tokenDecimalsTuple);
  const priceFormatted = poolTokensToAuto(fraction, tokenDecimalsTuple, {
    format: true,
  });

  const priceRev = poolTokensToAuto(fraction, tokenDecimalsTuple, {
    reverse: true,
  });
  const priceRevFormatted = poolTokensToAuto(fraction, tokenDecimalsTuple, {
    format: true,
    reverse: true,
  });

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

  const tokens = await getLPTokensData(lpContract, provider);

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
