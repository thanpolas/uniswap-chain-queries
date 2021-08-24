/**
 * @fileoverview Test API Surface.
 */

const lib = require('../..');

describe('API Surface tests', () => {
  it('Should export the expected properties', () => {
    expect(lib).toContainAllKeys([
      'getPriceUniswapV2',
      'getLPTokenDecimals',
      'getLPTokensData',
      'getLPTokensDataByLpAddress',
      'getLPContractV2',
      'queryFactoryForLPUniV2',
      'getFactoryContractV2',
      'queryFactoryForLPUniV3',
      'getPriceUniswapV3',
      'getFactoryContractV3',
      'getLPContractV3',
      'getToken',

      'poolUniV2Abi',
      'factoryUniV2Abi',
      'poolUniV3Abi',
      'factoryUniV3Abi',
      'erc20abi',

      'FEES',
      'FEE_DECIMALS',
    ]);
  });
  it('Exported properties should have the expected type', () => {
    expect(lib.getPriceUniswapV2).toBeFunction();
    expect(lib.getLPTokenDecimals).toBeFunction();
    expect(lib.getLPTokensData).toBeFunction();
    expect(lib.getLPTokensDataByLpAddress).toBeFunction();
    expect(lib.getLPContractV2).toBeFunction();
    expect(lib.queryFactoryForLPUniV2).toBeFunction();
    expect(lib.getFactoryContractV2).toBeFunction();
    expect(lib.queryFactoryForLPUniV3).toBeFunction();
    expect(lib.getPriceUniswapV3).toBeFunction();
    expect(lib.getFactoryContractV3).toBeFunction();
    expect(lib.getLPContractV3).toBeFunction();
    expect(lib.getToken).toBeFunction();

    expect(lib.poolUniV2Abi).toBeArray();
    expect(lib.factoryUniV2Abi).toBeArray();
    expect(lib.poolUniV3Abi).toBeArray();
    expect(lib.factoryUniV3Abi).toBeArray();
    expect(lib.erc20abi).toBeArray();

    expect(lib.FEES).toBeObject();
    expect(lib.FEE_DECIMALS).toBeNumber();
  });
});
