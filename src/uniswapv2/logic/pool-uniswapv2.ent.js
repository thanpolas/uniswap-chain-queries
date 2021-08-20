/**
 * @fileoverview Fetches on-chain reserves for uniswap v2 liquidity pools and
 * calculates prices.
 */

const { getTokenData } = require('../../../logic/tokens.ent');
const {
  getLPContractAndProvider,
} = require('../../../logic/get-lp-contract.ent');

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
entity.getPriceUniswapV2 = async (liquidityPool, lpContract, provider) => {
  const [token0Reserves, token1Reserves] = await entity._getNormalizedReserves(
    liquidityPool,
    lpContract,
    provider,
  );

  // Get the price
  const price = token0Reserves / token1Reserves;
  const priceFormatted = entity._formatPrice(price);
  const priceRev = token1Reserves / token0Reserves;
  const priceRevFormatted = entity._formatPrice(priceRev);
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
    liquidityPool,
    lpAddress: liquidityPool.contract_address,
  };
};

/**
 * Will return the normalized reserves of the liquidity pool tokens.
 *
 * @param {LiquidityPool|Object} liquidityPool the LP record to fetch price for
 *  or simple LP object.
 * @param {Object} lpContract The LP contract instance.
 * @param {Object} provider The provider to use.
 * @return {Promise<Array<number>>} A promise with a tuple representing the
 *    token reserves in the LP.
 * @private
 */
entity._getNormalizedReserves = async (liquidityPool, lpContract, provider) => {
  try {
    const reserves = await lpContract.getReserves();

    let token0decimals = liquidityPool.token0_decimals;
    let token1decimals = liquidityPool.token1_decimals;

    if (!token0decimals) {
      // not an LP record, fetch decimals from chain
      const { token0, token1 } = await entity.getLiquidityPoolTokensRaw(
        lpContract,
        provider,
      );
      token0decimals = token0.decimals;
      token1decimals = token1.decimals;
    }

    // convert the numbers to appropriate values based on their decimals declared
    // in their contracts
    const token0Reserves = Number(reserves._reserve0) / 10 ** token0decimals;
    const token1Reserves = Number(reserves._reserve1) / 10 ** token1decimals;

    return [token0Reserves, token1Reserves];
  } catch (ex) {
    await log.error('_getNormalizedReserves() Error', {
      error: ex,
      liquidityPool,
      relay: true,
    });
    return [];
  }
};

/**
 * Will return data of the tokens comprizing the liquidity pool from chain,
 * wrapper for getLiquidityPoolTokensRaw, instantiating the LP contract and
 * provider.
 *
 * @param {LiquidityPool} liquidityPool the LP record to fetch tokens for.
 * @return {Promise<Object>} A promise with the data for the two tokens.
 */
entity.getLiquidityPoolTokens = async (liquidityPool) => {
  const { lpContract, provider } = getLPContractAndProvider(liquidityPool);

  const lps = await entity.getLiquidityPoolTokensRaw(lpContract, provider);

  return lps;
};

/**
 * The actual operation of fetching the tokens' data that the Liquidity Pool
 * is comprized of.
 *
 * @param {Object} lpContract LPs ether.js contract instance.
 * @param {Object} provider Ether.js provider instance.
 * @return {Promise<Object>} A promise with the data for the two tokens.
 */
entity.getLiquidityPoolTokensRaw = async (lpContract, provider) => {
  const token0Address = await lpContract.token0();
  const token1Address = await lpContract.token1();

  const token0Data = await getTokenData(token0Address, provider);
  const token1Data = await getTokenData(token1Address, provider);

  return {
    token0: {
      name: token0Data.name,
      symbol: token0Data.symbol,
      address: token0Address,
      decimals: token0Data.decimals,
    },
    token1: {
      name: token1Data.name,
      symbol: token1Data.symbol,
      address: token1Address,
      decimals: token1Data.decimals,
    },
  };
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
