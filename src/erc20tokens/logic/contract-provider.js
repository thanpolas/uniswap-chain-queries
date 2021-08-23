/**
 * @fileoverview Provides ethers.js contract instances.
 */

const { ethers } = require('ethers');

const erc20GenericAbi = require('../abi/erc20generic.abi.json');

const entity = (module.exports = {});

/**
 * Get ethers.js ERC20 contract.
 *
 * @param {string} tokenAddress The token Address.
 * @param {Object} provider The provider to use.
 * @return {Object} Ethers.js contract instance.
 */
entity.getERC20Contract = (tokenAddress, provider) => {
  const tokenContract = new ethers.Contract(
    tokenAddress,
    erc20GenericAbi,
    provider,
  );
  return tokenContract;
};
