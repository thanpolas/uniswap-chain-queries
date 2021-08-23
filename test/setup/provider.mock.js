/**
 * @fileoverview Produces an ether.js provider mock.
 */

const { providerNetworkFix } = require('../fixtures/provider.fix');

const mock = (module.exports = {});

mock.providerMock = () => {
  const getNetwork = jest.fn(async () => providerNetworkFix());
  const provider = { getNetwork };

  return {
    provider,
    getNetwork,
  };
};
