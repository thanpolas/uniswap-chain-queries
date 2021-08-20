/**
 * @fileoverview Provides ethers.js contract instances.
 */

const { ethers } = require('ethers');

const abiPool = require('../abi/uniswap-v2-pool.abi.json');

const entity = (module.exports = {});

/**
 * Get the ethers.js LP contract.
 *
 * @param {string} lpAddress The LP Address.
 * @param {Object} provider The provider to use.
 * @return {Object} Ethers.js contract instance.
 */
entity.getLPContract = (lpAddress, provider) => {
  const lpContract = new ethers.Contract(lpAddress, abiPool, provider);

  return lpContract;
};
