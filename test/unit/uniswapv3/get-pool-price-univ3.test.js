/**
 * @fileoverview Test the getPriceUniswapV3() method.
 */

const { getPriceUniswapV3 } = require('../../..');
const contractProviderUniv3 = require('../../../src/uniswapv3/logic/contract-provider.ent');
const contractProviderToken = require('../../../src/erc20tokens/logic/contract-provider');

const { providerMock } = require('../../setup/provider.mock');
const {
  contractPoolUniV3,
  contractToken,
} = require('../../setup/contracts.mock');

const {
  assert: assertPoolPrice,
} = require('../../assert/pool-price-v3.assert');

const { uniV3_dai_weth } = require('../../fixtures/prices.fix');
const { lpAddressV3Fix } = require('../../fixtures/lp-factory.fix');

describe('getPriceUniswapV3()', () => {
  describe('Happy Path', () => {
    it('should return expected result', async () => {
      const provMock = providerMock();
      const contractMockPool = contractPoolUniV3();
      const contractMockToken = contractToken();

      contractProviderUniv3.getLPContract = contractMockPool.Contract;
      contractProviderToken.getERC20Contract = contractMockToken.Contract;

      const { provider } = provMock;

      const res = await getPriceUniswapV3(lpAddressV3Fix, provider);

      assertPoolPrice(res, uniV3_dai_weth());

      expect(contractMockToken.decimals).toHaveReturnedTimes(2);
      expect(contractMockToken.name).toHaveReturnedTimes(2);
      expect(contractMockToken.symbol).toHaveReturnedTimes(2);
    });

    it('should return price and not fetch token data when given decimals', async () => {
      const provMock = providerMock();
      const contractMockPool = contractPoolUniV3();
      const contractMockToken = contractToken();

      contractProviderUniv3.getLPContract = contractMockPool.Contract;
      contractProviderToken.getERC20Contract = contractMockToken.Contract;

      const { provider } = provMock;

      const decimals = [18, 18];

      const res = await getPriceUniswapV3(lpAddressV3Fix, provider, decimals);

      assertPoolPrice(res, uniV3_dai_weth());

      expect(contractMockToken.decimals).toHaveReturnedTimes(0);
      expect(contractMockToken.name).toHaveReturnedTimes(0);
      expect(contractMockToken.symbol).toHaveReturnedTimes(0);
    });
  });
});
