/**
 * @fileoverview Uniswap V2 related modules and logic.
 */

const { queryFactoryForLPUniV2 } = require('./logic/factory-uniswapv2.ent');
const { getPriceUniswapV2 } = require('./logic/pool-uniswapv2.ent');
const {
  getLPContract,
  getFactoryContract,
} = require('./logic/contract-provider.ent');

const poolUniV2Abi = require('./abi/uniswap-v2-pool.abi.json');
const factoryUniV2Abi = require('./abi/uniswap-v2-factory.abi.json');

const entity = (module.exports = {});

entity.queryFactoryForLPUniV2 = queryFactoryForLPUniV2;
entity.getPriceUniswapV2 = getPriceUniswapV2;
entity.getFactoryContractV2 = getFactoryContract;
entity.getLPContractV2 = getLPContract;
entity.poolUniV2Abi = poolUniV2Abi;
entity.factoryUniV2Abi = factoryUniV2Abi;
