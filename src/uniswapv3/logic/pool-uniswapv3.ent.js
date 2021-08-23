/**
 * @fileoverview Fetches on-chain reserves for uniswap v2 liquidity pools and
 * calculates prices.
 */

const {
  tickPrice,
  getAmountsForCurrentLiquidity,
} = require('@thanpolas/univ3prices');

const { FEE_DECIMALS } = require('../constants/fees.const');
const contractProviderUniv3 = require('./contract-provider.ent');
const { getLPTokenDecimals } = require('../../erc20tokens');

const entity = (module.exports = {});

/** @type {Map} A Map containing the number of decimals per token address */
entity._tokenDataMap = new Map();

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
entity.getPriceUniswapV3 = async (lpAddress, provider, optTokenDecimals) => {
  const lpContract = contractProviderUniv3.getLPContract(lpAddress, provider);

  const [[slot0Data, liquidityRaw, tickSpacing, feeRaw], lpTokenDecimals] =
    await Promise.all([
      entity._fetchOnChainData(lpContract),
      getLPTokenDecimals(lpContract, provider, optTokenDecimals),
    ]);

  // Calculate ratios (prices)
  const { price, priceFormatted, priceRev, priceRevFormatted } =
    entity._calculateRatios(lpTokenDecimals, slot0Data.tick);

  // Get the reserves.
  const {
    token0Reserves,
    token1Reserves,
    token0ReservesFormatted,
    token1ReservesFormatted,
  } = entity._calculateReserves(
    lpTokenDecimals,
    liquidityRaw,
    slot0Data.sqrtPriceX96,
    tickSpacing,
  );

  const feeDecimal = feeRaw / FEE_DECIMALS;
  const feeFormatted = `${feeDecimal}%`;

  return {
    price,
    priceFormatted,
    priceRev,
    priceRevFormatted,
    fee: feeFormatted,
    token0Reserves,
    token1Reserves,
    token0ReservesFormatted,
    token1ReservesFormatted,
    lpAddress,
  };
};

/**
 * Calls and Fetches multiple data from the LP contract.
 *
 * @param {string} lpContract LP Contract address.
 * @return {Promise<Array<*>>} Promise with array from all the calls to fetch data.
 * @private
 */
entity._fetchOnChainData = async (lpContract) => {
  return Promise.all([
    lpContract.slot0(),
    lpContract.liquidity(),
    lpContract.tickSpacing(),
    lpContract.fee(),
  ]);
};

/**
 * Will calculate a price and rev price and format them.
 *
 * @param {Array<string>} lpTokenDecimals Array tupple with the LP token decimals.
 * @param {string} tick Tick ratio value to calculate prices for.
 * @return {Object<string>} Calculated prices.
 * @private
 */
entity._calculateRatios = (lpTokenDecimals, tick) => {
  const price = tickPrice(lpTokenDecimals, tick).toAuto();
  const priceFormatted = tickPrice(lpTokenDecimals, tick).toAuto({
    format: true,
  });

  const priceRev = tickPrice(lpTokenDecimals, tick).toAuto({
    reverse: true,
  });
  const priceRevFormatted = tickPrice(lpTokenDecimals, tick).toAuto({
    reverse: true,
    format: true,
  });

  return {
    price,
    priceFormatted,
    priceRev,
    priceRevFormatted,
  };
};

/**
 * Calculates the liquidity value for each token and formats them.
 *
 * @param {Array<string>} lpTokenDecimals Array tupple with the LP token decimals.
 * @param {string} liquidityRaw Pool liquidity value.
 * @param {string} sqrtPriceX96 sqrt value of pool.
 * @param {string|number} tickSpacing Tick spacing of the pool.
 * @return {Object<string>}  Calculated liquidity.
 * @private
 */
entity._calculateReserves = (
  lpTokenDecimals,
  liquidityRaw,
  sqrtPriceX96,
  tickSpacing,
) => {
  const [token0Reserves, token1Reserves] = getAmountsForCurrentLiquidity(
    lpTokenDecimals,
    liquidityRaw,
    sqrtPriceX96,
    tickSpacing,
  );

  const [token0ReservesFormatted, token1ReservesFormatted] =
    getAmountsForCurrentLiquidity(
      lpTokenDecimals,
      liquidityRaw,
      sqrtPriceX96,
      tickSpacing,
      { token0Opts: { format: true }, token1Opts: { format: true } },
    );

  return {
    token0Reserves,
    token1Reserves,
    token0ReservesFormatted,
    token1ReservesFormatted,
  };
};
