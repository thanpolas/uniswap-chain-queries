/**
 * @fileoverview Test the queryFactoryForLPUniV3() method.
 */

const { queryFactoryForLPUniV3 } = require('../../..');
const contractProviderUniv3 = require('../../../src/uniswapv3/logic/contract-provider.ent');

const { providerMock } = require('../../setup/provider.mock');
const { tokenPair } = require('../../fixtures/token.fix');
const { contractFactoryUniV3 } = require('../../setup/contracts.mock');

const {
  factoryAddressV3Fix,
  lpAddressV3SmallFeeFix,
  lpAddressV3MediumFeeFix,
  lpAddressV3HighFeeFix,
} = require('../../fixtures/lp-factory.fix');

describe('queryFactoryForLPUniV3()', () => {
  describe('Happy Path', () => {
    it('should return expected result', async () => {
      const provMock = providerMock();
      const contractMock = contractFactoryUniV3();

      contractProviderUniv3.getFactoryContract = contractMock.Contract;

      const { provider } = provMock;

      const res = await queryFactoryForLPUniV3(
        factoryAddressV3Fix,
        provider,
        tokenPair(),
      );

      expect(res).toBeArray();
      expect(res).toHaveLength(3);

      const allPools = [
        lpAddressV3SmallFeeFix,
        lpAddressV3MediumFeeFix,
        lpAddressV3HighFeeFix,
      ];
      expect(res).toIncludeAllMembers(allPools);
    });
  });
});
