/**
 * @fileoverview Functions related to ERC20 token contracts.
 */

const {
  getLiquidityPoolTokenDecimals,
} = require('./logic/get-lp-token-decimals.ent');
const { getLPTokensData } = require('./logic/get-lp-token-data.ent');
const { getToken } = require('./logic/get-token.ent');
const erc20abi = require('./abi/erc20generic.abi.json');

const entity = (module.exports = {});

entity.getToken = getToken;
entity.getLiquidityPoolTokenDecimals = getLiquidityPoolTokenDecimals;
entity.getLPTokensData = getLPTokensData;
entity.erc20abi = erc20abi;
