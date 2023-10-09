/**
 * @fileoverview Fetches on-chain reserves for uniswap v2 liquidity pools and
 * calculates prices.
 */

const { poolTokensToAuto, tokenToAuto } = require('@thanpolas/crypto-utils');

const contractProvider = require('./contract-provider.ent');
const { getLPTokenDecimals } = require('../../erc20tokens');

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
  const lpContract = contractProvider.getLPContract(lpAddress, provider);

  const [{ _reserve0, _reserve1 }, tokenDecimalsTuple] = await Promise.all([
    lpContract.getReserves(),
    getLPTokenDecimals(lpContract, provider, optTokenDecimals),
  ]);

  const reservesTuple = [String(_reserve0), String(_reserve1)];

  // Get the price
  const { price, priceFormatted, priceRev, priceRevFormatted } =
    entity._getPrices(reservesTuple, tokenDecimalsTuple);

  const {
    token0Reserves,
    token1Reserves,
    token0ReservesFormatted,
    token1ReservesFormatted,
  } = entity._getReserves(reservesTuple, tokenDecimalsTuple);

  return {
    price,
    priceFormatted,
    priceRev,
    priceRevFormatted,
    token0Reserves,
    token1Reserves,
    token0ReservesBI: BigInt(_reserve0),
    token1ReservesBI: BigInt(_reserve1),
    token0ReservesFormatted,
    token1ReservesFormatted,
    lpAddress,
  };
};

/**
 * Perform calculations and formatting of prices based on token reserves.
 *
 * @param {Array<string>} reservesTuple Array tuple with token reserves.
 * @param {Array<string>} tokenDecimalsTuple Array tuple with the tokens' decimals.
 * @return {Object} Object with calculated and formated prices.
 * @private
 */
entity._getPrices = (reservesTuple, tokenDecimalsTuple) => {
  const price = poolTokensToAuto(reservesTuple, tokenDecimalsTuple);
  const priceFormatted = poolTokensToAuto(reservesTuple, tokenDecimalsTuple, {
    format: true,
  });

  const priceRev = poolTokensToAuto(reservesTuple, tokenDecimalsTuple, {
    reverse: true,
  });
  const priceRevFormatted = poolTokensToAuto(
    reservesTuple,
    tokenDecimalsTuple,
    {
      format: true,
      reverse: true,
    },
  );

  return {
    price,
    priceFormatted,
    priceRev,
    priceRevFormatted,
  };
};

/**
 * Perform calculations and formatting of token reserves.
 *
 * @param {Array<string>} reservesTuple Array tuple with token reserves.
 * @param {Array<string>} tokenDecimalsTuple Array tuple with the tokens' decimals.
 * @return {Object} Object with calculated and formated reserves.
 * @private
 */
entity._getReserves = (reservesTuple, tokenDecimalsTuple) => {
  const [reserves0, reserves1] = reservesTuple;
  const [token0Decimals, token1Decimals] = tokenDecimalsTuple;

  const token0Reserves = tokenToAuto(reserves0, token0Decimals);
  const token1Reserves = tokenToAuto(reserves1, token1Decimals);
  const token0ReservesFormatted = tokenToAuto(reserves0, token0Decimals, {
    decimalPlaces: 2,
    format: true,
  });
  const token1ReservesFormatted = tokenToAuto(reserves1, token1Decimals, {
    decimalPlaces: 2,
    format: true,
  });

  return {
    token0Reserves,
    token1Reserves,
    token0ReservesFormatted,
    token1ReservesFormatted,
  };
};
