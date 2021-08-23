/**
 * @fileoverview Uniswap V3 related modules and logic.
 */

const { queryFactoryForLPuniswapv3 } = require('./logic/factory-uniswapv3.ent');
const { getPriceUniswapV3 } = require('./logic/pool-uniswapv3.ent');
const {
  getLPContract,
  getFactoryContract,
} = require('./logic/contract-provider.ent');
const poolUniV3Abi = require('./abi/uniswap-v3-pool.abi.json');
const factoryUniV3Abi = require('./abi/uniswap-v3-factory.abi.json');
const { FEES, FEE_DECIMALS } = require('./constants/fees.const');

const entity = (module.exports = {});

entity.queryFactoryForLPuniswapv3 = queryFactoryForLPuniswapv3;
entity.getPriceUniswapV3 = getPriceUniswapV3;
entity.getFactoryContractV3 = getFactoryContract;
entity.getLPContractV3 = getLPContract;
entity.poolUniV3Abi = poolUniV3Abi;
entity.factoryUniV3Abi = factoryUniV3Abi;
entity.FEES = FEES;
entity.FEE_DECIMALS = FEE_DECIMALS;
