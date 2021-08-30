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
      const { Contract, getPool } = contractFactoryUniV3();

      contractProviderUniv3.getFactoryContract = Contract;

      const { provider } = provMock;
      const tokenTuple = tokenPair();
      const [token0Address, token1Address] = tokenTuple;
      const res = await queryFactoryForLPUniV3(
        factoryAddressV3Fix,
        provider,
        tokenTuple,
      );

      expect(res).toBeArray();
      expect(res).toHaveLength(3);

      expect(getPool).toHaveBeenNthCalledWith(
        1,
        token0Address,
        token1Address,
        500,
      );
      expect(getPool).toHaveBeenNthCalledWith(
        2,
        token0Address,
        token1Address,
        3000,
      );
      expect(getPool).toHaveBeenNthCalledWith(
        3,
        token0Address,
        token1Address,
        10000,
      );

      const allPools = [
        lpAddressV3SmallFeeFix,
        lpAddressV3MediumFeeFix,
        lpAddressV3HighFeeFix,
      ];
      expect(res).toIncludeAllMembers(allPools);
    });
  });
});
