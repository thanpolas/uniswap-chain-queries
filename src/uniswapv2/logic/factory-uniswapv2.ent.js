/**
 * @fileoverview Queries a factory for existing LPs using a token pair for
 *    UniswapV2 clones.
 */

const { ethers } = require('ethers');

const { getProvider } = require('../../../ether.service');
const log = require('../../../../../services/log.service').get();
const { NOT_FOUND } = require('../../../constants/common-tokens.const');

const entity = (module.exports = {});

/**
 * Queries a factory for existing LPs using a token pair for UniswapV2 clones.
 *
 * @param {Object} factory The factory constant object.
 * @param {Object} network An item from the network constants.
 * @param {Array<Object>} tokenPair The token pair to look for.
 * @return {Promise<string|void>} A promise with liquidity pool or empty.
 */
entity.queryFactoryForLPuniswapv2 = async (factory, network, tokenPair) => {
  const provider = getProvider(network);

  const abi = factory.abi.abiFactory;

  const contract = new ethers.Contract(factory.address, abi, provider);

  const [token0, token1] = tokenPair;

  let lpAddress;
  try {
    lpAddress = await contract.getPair(token0.address, token1.address);
  } catch (ex) {
    await log.error(
      `queryFactoryForLPuniswapv2() Querying contract failed. Network` +
        ` "${network.name}" Factory: "${factory.exchangeName}"` +
        ` Token0:` +
        ` ${token0.symbol} - ${token0.address} Token1: ${token1.symbol} -` +
        ` ${token1.address}`,
      {
        error: ex,
        relay: true,
      },
    );
    return;
  }

  if (lpAddress === NOT_FOUND) {
    return [];
  }

  return [
    {
      address: lpAddress,
      factory,
    },
  ];
};
