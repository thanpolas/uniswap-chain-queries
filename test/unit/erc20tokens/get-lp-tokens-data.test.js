/**
 * @fileoverview Test the getLPTokensData() method.
 */

const { getLPTokensData, getLPTokensDataByLpAddress } = require('../../..');
const contractProviderToken = require('../../../src/erc20tokens/logic/contract-provider');
const contractProviderUniv2 = require('../../../src/uniswapv2/logic/contract-provider.ent');

const { lpContractMock } = require('../../setup/contracts.mock');
const { providerMock } = require('../../setup/provider.mock');
const {
  contractToken,
  contractPoolUniV2,
} = require('../../setup/contracts.mock');
const { lpAddressV2Fix } = require('../../fixtures/lp-factory.fix');
const {
  assert: assertLpTokensData,
} = require('../../assert/lp-token-data.assert');
const { assert: assertTokenData } = require('../../assert/token-data.assert');
const { token0Data, token1Data } = require('../../fixtures/token.fix');

describe('Get Tokens Data from LP', () => {
  describe('getLPTokensData', () => {
    it('should return expected result', async () => {
      const lpMock = lpContractMock();
      const provMock = providerMock();
      const contractMock = contractToken();

      contractProviderToken.getERC20Contract = contractMock.Contract;

      const { lpContract } = lpMock;
      const { provider } = provMock;

      const res = await getLPTokensData(lpContract, provider);

      assertLpTokensData(res);

      const [token0, token1] = res;

      assertTokenData(token0, token0Data());
      assertTokenData(token1, token1Data());
    });
  });

  describe('getLPTokensDataByLpAddress()', () => {
    it('should return expected result', async () => {
      const provMock = providerMock();
      const contractMockPool = contractPoolUniV2();

      contractProviderUniv2.getLPContract = contractMockPool.Contract;

      const { provider } = provMock;

      const res = await getLPTokensDataByLpAddress(lpAddressV2Fix, provider);

      assertLpTokensData(res);

      const [token0, token1] = res;

      assertTokenData(token0, token0Data());
      assertTokenData(token1, token1Data());
    });
  });
});
