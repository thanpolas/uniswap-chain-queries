/**
 * @fileoverview Provides ethers.js contract instances.
 */

const { ethers } = require('ethers');

const abiPool = require('../abi/uniswap-v3-pool.abi.json');
const abiFactory = require('../abi/uniswap-v3-factory.abi.json');

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

/**
 * Get the ethers.js Factory contract.
 *
 * @param {string} factoryAddress The factory contract Address.
 * @param {Object} provider The provider to use.
 * @return {Object} Ethers.js contract instance.
 */
entity.getFactoryContract = (factoryAddress, provider) => {
  const factoryContract = new ethers.Contract(
    factoryAddress,
    abiFactory,
    provider,
  );

  return factoryContract;
};
