/**
 * @fileoverview Produces a Liquidity Pool ether.js contract mock.
 */

const { token0Address, token1Address } = require('../fixtures/token.fix');

const mock = (module.exports = {});

mock.lpContractMock = () => {
  const token0 = jest.fn(() => Promise.resolve(token0Address));
  const token1 = jest.fn(() => Promise.resolve(token1Address));

  const lpContract = {
    token0,
    token1,
  };

  return {
    token0,
    token1,
    lpContract,
  };
};
