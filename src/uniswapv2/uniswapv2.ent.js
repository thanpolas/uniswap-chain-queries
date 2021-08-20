/**
 * @fileoverview Uniswap V2 related modules and logic.
 */

const { queryFactoryForLPuniswapv2 } = require('./logic/factory-uniswapv2.ent');
const {
  getPriceUniswapV2,
  getLiquidityPoolTokens,
} = require('./logic/pool-uniswapv2.ent');

const entity = (module.exports = {});

entity.queryFactoryForLPuniswapv2 = queryFactoryForLPuniswapv2;
entity.getPriceUniswapV2 = getPriceUniswapV2;
entity.getLiquidityPoolTokens = getLiquidityPoolTokens;
