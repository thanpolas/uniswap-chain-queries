/**
 * @fileoverview Mocks for certain functions and usecases of ethers.js library.
 */

const {
  token0Address,
  token1Address,
  token0Data,
  token1Data,
} = require('../fixtures/token.fix');

const {
  lpAddressV2Fix,
  lpReservesFix,
  lpUniV3Fix,
} = require('../fixtures/lp-factory.fix');

const mock = (module.exports = {});

/**
 * Creates a Contract Ctor with the methods used in token queries.
 *
 * @return {Object}
 */
mock.contractToken = () => {
  let tokenData;
  const decimals = jest.fn(async () => tokenData.decimals);
  const name = jest.fn(async () => tokenData.name);
  const symbol = jest.fn(async () => tokenData.symbol);

  const Contract = jest.fn((tokenAddress) => {
    tokenData = tokenAddress === token0Address ? token0Data() : token1Data();

    return {
      decimals,
      name,
      symbol,
    };
  });

  return {
    decimals,
    name,
    symbol,
    Contract,
  };
};

/**
 * Creates a Contract Ctor with the methods used in uniV2 factory queries.
 *
 * @return {Object}
 */
mock.contractFactoryUniV2 = () => {
  const getPair = jest.fn(async () => lpAddressV2Fix);

  const Contract = jest.fn(() => {
    return { getPair };
  });

  return {
    getPair,
    Contract,
  };
};

/**
 * Creates a Contract Ctor with the methods used in uniV2 Liquidity Pool queries.
 *
 * @return {Object}
 */
mock.contractPoolUniV2 = () => {
  const getReserves = jest.fn(async () => lpReservesFix());
  const token0 = jest.fn(() => Promise.resolve(token0Address));
  const token1 = jest.fn(() => Promise.resolve(token1Address));

  const Contract = jest.fn(() => {
    return {
      token0,
      token1,
      getReserves,
    };
  });

  return {
    getReserves,
    token0,
    token1,
    Contract,
  };
};

/**
 * Instantiated LP Contract.
 *
 * @return {Object}
 */
mock.lpContractMock = () => {
  const contractMock = mock.contractPoolUniV2();

  const lpContract = {
    token0: contractMock.token0,
    token1: contractMock.token1,
  };

  return {
    token0: contractMock.token0,
    token1: contractMock.token1,
    lpContract,
  };
};

/**
 * Creates a Contract Ctor with the methods used in uniV3 Liquidity Pool queries.
 *
 * @return {Object}
 */
mock.contractPoolUniV3 = () => {
  const { slot0Fix, liquidityFix, tickSpacingFix, feeFix } = lpUniV3Fix();

  const slot0 = jest.fn(() => Promise.resolve(slot0Fix()));
  const liquidity = jest.fn(() => Promise.resolve(liquidityFix));
  const tickSpacing = jest.fn(() => Promise.resolve(tickSpacingFix));
  const fee = jest.fn(() => Promise.resolve(feeFix));
  const token0 = jest.fn(() => Promise.resolve(token0Address));
  const token1 = jest.fn(() => Promise.resolve(token1Address));

  const Contract = jest.fn(() => {
    return {
      slot0,
      liquidity,
      tickSpacing,
      fee,
      token0,
      token1,
    };
  });

  return {
    token0,
    token1,
    slot0,
    liquidity,
    tickSpacing,
    fee,
    Contract,
  };
};
