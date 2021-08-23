/**
 * @fileoverview Mocks for certain functions and usecases of ethers.js library.
 */

const {
  token0Address,
  token0Data,
  token1Data,
} = require('../fixtures/token.fix');

const mock = (module.exports = {});

/**
 * Creates a Contract Ctor with the methods used in token queries.
 *
 * @return {Object}
 */
mock.contractToken = () => {
  let decimals;
  let name;
  let symbol;

  const Contract = jest.fn((tokenAddress) => {
    const tokenData =
      tokenAddress === token0Address ? token0Data() : token1Data();

    decimals = jest.fn(async () => tokenData.decimals);
    name = jest.fn(async () => tokenData.name);
    symbol = jest.fn(async () => tokenData.symbol);

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
