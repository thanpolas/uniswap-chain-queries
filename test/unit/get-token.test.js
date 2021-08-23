/**
 * @fileoverview Test the getToken() method.
 */

const { ethers } = require('ethers');

const { getToken } = require('../..');
const contractProvider = require('../../src/erc20tokens/logic/contract-provider');
const getTokenEnt = require('../../src/erc20tokens/logic/get-token.ent');

const { providerMock } = require('../setup/provider.mock');
const { contractToken } = require('../setup/ethers.mock');

const { assert: assertTokenData } = require('../assert/token-data.assert');
const { token0Data } = require('../fixtures/token.fix');

describe('getToken()', () => {
  describe('Happy Path', () => {
    beforeEach(() => {
      // Clear all cache from token entity.
      getTokenEnt._tokenDataMap.clear();
    });
    it('should return expected result', async () => {
      const provMock = providerMock();
      const contractMock = contractToken();

      contractProvider.getERC20Contract = contractMock.Contract;
      ethers.Contract = contractMock.Contract;

      const tokenData = token0Data();

      const { provider } = provMock;

      const res = await getToken(tokenData.address, provider);

      assertTokenData(res, token0Data());
    });

    it('should use cache when requesting second time the same token', async () => {
      const provMock = providerMock();
      const contractMock = contractToken();

      contractProvider.getERC20Contract = contractMock.Contract;
      ethers.Contract = contractMock.Contract;

      const tokenData = token0Data();

      const { provider } = provMock;

      const res1 = await getToken(tokenData.address, provider);
      const res2 = await getToken(tokenData.address, provider);

      assertTokenData(res1, token0Data());
      assertTokenData(res2, token0Data());
      expect(contractMock.decimals).toHaveBeenCalledTimes(1);
      expect(contractMock.name).toHaveBeenCalledTimes(1);
      expect(contractMock.symbol).toHaveBeenCalledTimes(1);
    });
  });
});
