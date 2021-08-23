/**
 * @fileoverview Mocks for certain functions and usecases of ethers.js library.
 */

const {
  token0Address,
  token0Data,
  token1Data,
} = require('../fixtures/token.fix');

const { lpAddressFix } = require('../fixtures/lp-factory.fix');

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
  const getPair = jest.fn(async () => lpAddressFix);

  const Contract = jest.fn(() => {
    return { getPair };
  });

  return {
    getPair,
    Contract,
  };
};
