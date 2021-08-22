/**
 * Uniswap Chain Queries
 * On chain queries for Uniswap V2 and V3
 *
 * https://github.com/thanpolas/uniswap-chain-queries
 *
 * Copyright © Thanos Polychronakis
 * LICENSE on /LICENSE file.
 */

/**
 * @fileoverview bootstrap and master exporting module.
 */

const uniV2 = require('./uniswapv2');
const uniV3 = require('./uniswapv3');
const erc20Token = require('./erc20tokens');

const app = (module.exports = {});

app.queryUniV2FactoryForLP = uniV2.queryUniV2FactoryForLP;
app.getPriceUniswapV2 = uniV2.getPriceUniswapV2;
app.getLiquidityPoolTokensByLpAddress = uniV2.getLiquidityPoolTokensByLpAddress;
app.getFactoryContractV2 = uniV2.getFactoryContractV2;
app.getLPContractV2 = uniV2.getLPContractV2;
app.poolUniV2Abi = uniV2.poolUniV2Abi;
app.factoryUniV2Abi = uniV2.factoryUniV2Abi;

app.queryFactoryForLPuniswapv3 = uniV3.queryFactoryForLPuniswapv3;
app.getPriceUniswapV3 = uniV3.getPriceUniswapV3;
app.getFactoryContractV3 = uniV3.getFactoryContractV3;
app.getLPContractV3 = uniV3.getLPContractV3;
app.poolUniV3Abi = uniV3.poolUniV3Abi;
app.factoryUniV3Abi = uniV3.factoryUniV3Abi;
app.FEES = uniV3.FEES;
app.FEE_DECIMALS = uniV3.FEE_DECIMALS;

app.getToken = erc20Token.getToken;
app.getLiquidityPoolTokenDecimals = erc20Token.getLiquidityPoolTokenDecimals;
app.getLPTokensData = erc20Token.getLPTokensData;
app.erc20abi = erc20Token.erc20abi;
