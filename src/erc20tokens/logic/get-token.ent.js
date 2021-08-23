/**
 * @fileoverview Functions related to ERC20 token contracts.
 */

const { ethers } = require('ethers');

const erc20GenericAbi = require('../abi/erc20generic.abi.json');

const entity = (module.exports = {});

/** @type {Map} A Map containing the fetched tokens acting as a simple cache */
entity._tokenDataMap = new Map();

/**
 * Will fetch token data from the chain, employs simple caching mechanism.
 *
 * @param {string} tokenAddress The token address for which to fetch the decimals.
 * @param {Object} provider Ether.js Provider instance.
 * @return {Promise<Object|void>} The data of the token, or empty if not found.
 */
entity.getToken = async (tokenAddress, provider) => {
  // check cache first
  if (entity._tokenDataMap.has(tokenAddress)) {
    return entity._tokenDataMap.get(tokenAddress);
  }

  try {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      erc20GenericAbi,
      provider,
    );

    const [decimals, name, symbol, providerNetwork] = await Promise.all([
      tokenContract.decimals(),
      tokenContract.name(),
      tokenContract.symbol(),
      provider.getNetwork(),
    ]);

    const tokenData = {
      address: tokenAddress,
      name,
      symbol,
      decimals,
      chainId: providerNetwork.chainId,
      network: providerNetwork.name,
    };

    // Update cache
    entity._tokenDataMap.set(tokenAddress, tokenData);

    return tokenData;
  } catch (ex) {
    // suppress errors originating from contract not found.
    if (!ex.message.includes('call revert exception')) {
      throw ex;
    }
  }
};
