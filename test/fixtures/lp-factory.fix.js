/**
 * @fileoverview Liquidity Pools and Factories fixtures.
 */

const fix = (module.exports = {});

// Uniswap V2 mainnet
fix.factoryAddressFix = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

// Uniswap V2 DAI/wETH LP
fix.lpAddressV2Fix = '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11';

// Uniswap V3 DAI/wETH LP, Fee: 0.3%
fix.lpAddressV3Fix = '0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8';

fix.lpReservesFix = () => {
  return {
    _reserve0: '40696198400047034005278149',
    _reserve1: '12231192365489141357156',
  };
};

fix.lpUniV3Fix = () => {
  return {
    slot0Fix: () => {
      return {
        sqrtPriceX96: '1371274559798662748875337628',
        tick: -81136,
        observationIndex: 39,
        observationCardinality: 50,
        observationCardinalityNext: 50,
        feeProtocol: 0,
        unlocked: true,
      };
    },
    liquidityFix: '7951453557397075823581352',
    tickSpacingFix: 60,
    feeFix: 3000,
  };
};
