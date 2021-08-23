/**
 * @fileoverview Test the getLPTokensData() method.
 */

const { ethers } = require('ethers');

const { getLPTokensData } = require('../..');
const contractProvider = require('../../src/erc20tokens/logic/contract-provider');

const { lpContractMock } = require('../setup/lp-contract.mock');
const { providerMock } = require('../setup/provider.mock');
const { contractToken } = require('../setup/ethers.mock');

const {
  assert: assertLpTokensData,
} = require('../assert/lp-token-data.assert');
const { assert: assertTokenData } = require('../assert/token-data.assert');
const { token0Data, token1Data } = require('../fixtures/token.fix');

describe('getLPTokensData()', () => {
  describe('Happy Path', () => {
    it('should return expected result', async () => {
      const lpMock = lpContractMock();
      const provMock = providerMock();
      const contractMock = contractToken();

      contractProvider.getERC20Contract = contractMock.Contract;
      ethers.Contract = contractMock.Contract;

      const { lpContract } = lpMock;
      const { provider } = provMock;

      const res = await getLPTokensData(lpContract, provider);

      assertLpTokensData(res);

      const [token0, token1] = res;

      assertTokenData(token0, token0Data());
      assertTokenData(token1, token1Data());
    });
  });
});
