/**
 * @fileoverview Token related fixtures.
 */

const fix = (module.exports = {});

fix.token0Address = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
fix.token1Address = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

fix.token0Data = () => {
  return {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    decimals: 18,
    chainId: 1,
    network: 'homestead',
  };
};

fix.token1Data = () => {
  return {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    chainId: 1,
    network: 'homestead',
  };
};
