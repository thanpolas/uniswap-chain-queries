/**
 * @fileoverview Test the getPriceUniswapV2() method.
 */

const { getPriceUniswapV2 } = require('../../..');
const contractProviderUniv2 = require('../../../src/uniswapv2/logic/contract-provider.ent');
const contractProviderToken = require('../../../src/erc20tokens/logic/contract-provider');

const { providerMock } = require('../../setup/provider.mock');
const {
  contractPoolUniV2,
  contractToken,
} = require('../../setup/contracts.mock');

const {
  assert: assertPoolPrice,
} = require('../../assert/pool-price-v2.assert');

const { lpAddressV2Fix } = require('../../fixtures/lp-factory.fix');
const { uniV2_dai_weth } = require('../../fixtures/prices.fix');

describe('getPriceUniswapV2()', () => {
  describe('Happy Path', () => {
    it('should return expected result', async () => {
      const provMock = providerMock();
      const contractMockPool = contractPoolUniV2();
      const contractMockToken = contractToken();

      contractProviderUniv2.getLPContract = contractMockPool.Contract;
      contractProviderToken.getERC20Contract = contractMockToken.Contract;

      const { provider } = provMock;

      const res = await getPriceUniswapV2(lpAddressV2Fix, provider);

      assertPoolPrice(res, uniV2_dai_weth());

      expect(contractMockToken.decimals).toHaveReturnedTimes(2);
      expect(contractMockToken.name).toHaveReturnedTimes(2);
      expect(contractMockToken.symbol).toHaveReturnedTimes(2);
    });

    it('should return price and not fetch token data when given decimals', async () => {
      const provMock = providerMock();
      const contractMockPool = contractPoolUniV2();
      const contractMockToken = contractToken();

      contractProviderUniv2.getLPContract = contractMockPool.Contract;
      contractProviderToken.getERC20Contract = contractMockToken.Contract;

      const { provider } = provMock;

      const decimals = [18, 18];

      const res = await getPriceUniswapV2(lpAddressV2Fix, provider, decimals);

      assertPoolPrice(res, uniV2_dai_weth());

      expect(contractMockToken.decimals).toHaveReturnedTimes(0);
      expect(contractMockToken.name).toHaveReturnedTimes(0);
      expect(contractMockToken.symbol).toHaveReturnedTimes(0);
    });
  });
});
