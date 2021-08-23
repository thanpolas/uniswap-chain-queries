/**
 * @fileoverview Liquidity Pools and Factories fixtures.
 */

const fix = (module.exports = {});

// Uniswap V2 mainnet
fix.factoryAddressFix = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

// Uniswap V2 DAI/wETH LP
fix.lpAddressFix = '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11';

fix.lpReservesFix = () => {
  return {
    _reserve0: '40696198400047034005278149',
    _reserve1: '12231192365489141357156',
  };
};
