/**
 * @fileoverview Uniswap V2 related modules and logic.
 */

const { queryUniV2FactoryForLP } = require('./logic/factory-uniswapv2.ent');
const {
  getPriceUniswapV2,
  getLiquidityPoolTokensByLpAddress,
} = require('./logic/pool-uniswapv2.ent');
const {
  getLPContract,
  getFactoryContract,
} = require('./logic/contract-provider.ent');

const poolUniV2Abi = require('./abi/uniswap-v2-pool.abi.json');
const factoryUniV2Abi = require('./abi/uniswap-v2-factory.abi.json');

const entity = (module.exports = {});

entity.queryUniV2FactoryForLP = queryUniV2FactoryForLP;
entity.getPriceUniswapV2 = getPriceUniswapV2;
entity.getLiquidityPoolTokensByLpAddress = getLiquidityPoolTokensByLpAddress;
entity.getFactoryContractV2 = getFactoryContract;
entity.getLPContractV2 = getLPContract;
entity.poolUniV2Abi = poolUniV2Abi;
entity.factoryUniV2Abi = factoryUniV2Abi;
