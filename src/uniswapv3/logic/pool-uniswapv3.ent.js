/**
 * @fileoverview Fetches on-chain reserves for uniswap v2 liquidity pools and
 * calculates prices.
 */

const {
  tickPrice,
  getAmountsForCurrentLiquidity,
} = require('@thanpolas/univ3prices');

const { FEE_DECIMALS } = require('../constants/fees.const');

const log = require('../../../../../services/log.service').get();

const entity = (module.exports = {});

/** @type {Map} A Map containing the number of decimals per token address */
entity._tokenDataMap = new Map();

/**
 * Will fetch LP Contract reserves and calculate the appropriate price for the
 * LP Pair.
 *
 * @param {LiquidityPool|Object} liquidityPool the LP record to fetch price for
 *  or simple LP object.
 * @param {Object} lpContract The LP contract instance.
 * @param {Object} provider The provider to use.
 * @return {Promise<Object>} A promise with the price and LP size.
 */
entity.getPriceUniswapV3 = async (
  liquidityPool,
  lpContract,
  /** provider */
) => {
  try {
    const [slot0Data, liquidityRaw, tickSpacing, feeRaw] = await Promise.all([
      lpContract.slot0(),
      lpContract.liquidity(),
      lpContract.tickSpacing(),
      lpContract.fee(),
    ]);

    // Calculate ratios (prices)
    const priceRev = tickPrice(
      liquidityPool.token0_decimals,
      liquidityPool.token1_decimals,
      slot0Data.tick,
    ).toSignificant();
    const price = tickPrice(
      liquidityPool.token0_decimals,
      liquidityPool.token1_decimals,
      slot0Data.tick,
      true,
    ).toSignificant();

    // Get the reserves.
    const [token0Reserves, token1Reserves] = getAmountsForCurrentLiquidity(
      liquidityPool.token0_decimals,
      liquidityPool.token1_decimals,
      liquidityRaw,
      slot0Data.sqrtPriceX96,
      tickSpacing,
    );
    const token0ReservesFormatted = new Intl.NumberFormat('en-US').format(
      token0Reserves,
    );
    const token1ReservesFormatted = new Intl.NumberFormat('en-US').format(
      token1Reserves,
    );

    const feeDecimal = feeRaw / FEE_DECIMALS;
    const feeFormatted = `${feeDecimal}%`;

    return {
      price,
      priceFormatted: price,
      priceRev,
      priceRevFormatted: priceRev,
      liquidityPool,
      fee: feeFormatted,
      token0Reserves,
      token1Reserves,
      token0ReservesFormatted,
      token1ReservesFormatted,
      lpAddress: liquidityPool.contract_address,
    };
  } catch (ex) {
    await log.error(
      'getPriceUniswapV3() :: Error fetching prices for uniswap V3',
      {
        error: ex,
        relay: true,
      },
    );
  }
};
