/**
 * @fileoverview Test the queryFactoryForLPuniswapv2() method.
 */

const { queryFactoryForLPuniswapv2 } = require('../../..');
const contractProvider = require('../../../src/uniswapv2/logic/contract-provider.ent');

const { providerMock } = require('../../setup/provider.mock');
const { contractFactoryUniV2 } = require('../../setup/contracts.mock');

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
  it('should return empty array when LP not found', async () => {
    const provMock = providerMock();
    const contractMock = contractFactoryUniV2();

    contractMock.getPair.mockResolvedValue(
      '0x0000000000000000000000000000000000000000',
    );
    contractProvider.getFactoryContract = contractMock.Contract;

    const { provider } = provMock;

    const res = await queryFactoryForLPuniswapv2(
      factoryAddressFix,
      provider,
      tokenPair(),
    );

    expect(res).toBeArray();
    expect(res).toHaveLength(0);
  });
});
