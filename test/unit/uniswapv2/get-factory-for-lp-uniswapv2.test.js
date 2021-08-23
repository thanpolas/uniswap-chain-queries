/**
 * @fileoverview Test the queryFactoryForLPuniswapv2() method.
 */

const { queryFactoryForLPuniswapv2 } = require('../../..');
const contractProvider = require('../../../src/uniswapv2/logic/contract-provider.ent');

const { providerMock } = require('../../setup/provider.mock');
const { contractFactoryUniV2 } = require('../../setup/ethers.mock');

const { tokenPair } = require('../../fixtures/token.fix');
const {
  factoryAddressFix,
  lpAddressFix,
} = require('../../fixtures/lp-factory.fix');

describe('queryFactoryForLPuniswapv2()', () => {
  describe('Happy Path', () => {
    it('should return expected result', async () => {
      const provMock = providerMock();
      const contractMock = contractFactoryUniV2();

      contractProvider.getFactoryContract = contractMock.Contract;

      const { provider } = provMock;

      const res = await queryFactoryForLPuniswapv2(
        factoryAddressFix,
        provider,
        tokenPair(),
      );

      expect(res).toBeArray();
      expect(res).toHaveLength(1);
      expect(res[0]).toEqual(lpAddressFix);
    });
  });
});
