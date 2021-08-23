/**
 * @fileoverview Test the getLPTokensData() method.
 */

const { getLPTokenDecimals } = require('../../..');
const contractProvider = require('../../../src/erc20tokens/logic/contract-provider');

const { lpContractMock } = require('../../setup/lp-contract.mock');
const { providerMock } = require('../../setup/provider.mock');
const { contractToken } = require('../../setup/ethers.mock');

describe('getLPTokenDecimals()', () => {
  describe('Happy Path', () => {
    it('should return expected result', async () => {
      const lpMock = lpContractMock();
      const provMock = providerMock();
      const contractMock = contractToken();

      contractProvider.getERC20Contract = contractMock.Contract;

      const { lpContract } = lpMock;
      const { provider } = provMock;

      const res = await getLPTokenDecimals(lpContract, provider);

      const [token0Decimals, token1Decimals] = res;
      expect(token0Decimals).toEqual(18);
      expect(token1Decimals).toEqual(18);
    });
    it('should return passed decimals and not fetch', async () => {
      const lpMock = lpContractMock();
      const provMock = providerMock();
      const contractMock = contractToken();

      contractProvider.getERC20Contract = contractMock.Contract;

      const { lpContract } = lpMock;
      const { provider } = provMock;

      const decimals = [18, 18];

      const res = await getLPTokenDecimals(lpContract, provider, decimals);

      const [token0Decimals, token1Decimals] = res;
      expect(token0Decimals).toEqual(18);
      expect(token1Decimals).toEqual(18);

      expect(contractMock.decimals).toHaveReturnedTimes(0);
      expect(contractMock.name).toHaveReturnedTimes(0);
      expect(contractMock.symbol).toHaveReturnedTimes(0);
    });
  });
});
