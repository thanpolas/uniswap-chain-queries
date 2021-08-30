# Uniswap Chain Queries

> On chain queries for ERC20 Tokens, Uniswap V2, V2 clones and V3

[![NPM Version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/thanpolas/uniswap-chain-queries.svg?style=svg)](https://circleci.com/gh/thanpolas/uniswap-chain-queries)
[![codecov](https://codecov.io/gh/thanpolas/uniswap-chain-queries/branch/main/graph/badge.svg?token=6BO1LFKLE0)](https://codecov.io/gh/thanpolas/uniswap-chain-queries)
[![Discord](https://img.shields.io/discord/847075821276758096?label=discord&color=CBE9F0)](https://discord.gg/GkyEqzJWEY)
[![Twitter Follow](https://img.shields.io/twitter/follow/thanpolas.svg?label=thanpolas&style=social)](https://twitter.com/thanpolas)

## <br />

<br />

> Check out the other Uniswap and crypto libraries, that this library depends on:
>
> 💰 [@thanpolas/univ3prices][univ3prices] for calculating Uniswap V3 Prices.
> <br />🔧 [@thanpolas/crypto-utils][crypto-utils] for calculating and formatting tokens and fractions.

## <br />

<br />

## Features

This library will allow you to:

-   [Query on-chain ERC20 tokens for their Data][erc20-docs].
-   [Query on-chain for Uniswap V2 Liquidity Pools and fetch prices for a token pair][univ2-docs].
-   [Query on-chain for Uniswap V3 Liquidity Pools and fetch prices for a token pair][univ3-docs].

> All queries are on-chain!

## Install

Install the module using NPM:

```
npm install @thanpolas/uniswap-chain-queries --save
```

# ERC20 Tokens Queries

## getToken(tokenAddress, provider)

Will fetch on-chain token data.

-   **tokenAddress** `{string}` The address of the ERC20 token.
-   **provider** `{Ethers.Provider}` An [ethers.js provider][ether-provider].
-   **Returns** `{Promise<Object>}` Token data.

```js
const { getToken } = require('@thanpolas/uniswap-chain-queries');

// Define the DAI address
const erc20Address = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

const tokenData = await getToken(erc20Address, provider);

console.log(tokenData);
// {
//     address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
//     name: 'Dai Stablecoin',
//     symbol: 'DAI',
//     decimals: 18,
//     chainId: 1,
//     network: 'homestead',
// };
```

## getLPTokensData(lpContract, provider)

Will fetch token data of a Uniswap V2 or V3 Liquidity Pool.

-   **lpContract** `{Ethers.Contract}` Instance of [ethers.js contract][ether-contract].
-   **provider** `{Ethers.Provider}` An [ethers.js provider][ether-provider].
-   **Returns** `{Promise<Array<Object>>}` An Array tuple with the two tokens' data.

```js
const { getLPTokensData } = require('@thanpolas/uniswap-chain-queries');

const tokensData = await getLPTokensData(lpContract, provider);

console.log(tokensData);
// [
//     {
//         address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
//         name: 'Wrapped Ether',
//         symbol: 'WETH',
//         decimals: 18,
//         chainId: 1,
//         network: 'homestead',
//     }
//     {
//         address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
//         name: 'Dai Stablecoin',
//         symbol: 'DAI',
//         decimals: 18,
//         chainId: 1,
//         network: 'homestead',
//     }
// ]
```

## getLPTokensDataByLpAddress(lpContract, provider)

Will fetch token data of a Uniswap V2 or V3 Liquidity Pool by using an LP address, wraps around the `getLPTokensData()` function.

-   **lpAddress** `{string}` Address of the Liquidity Pool.
-   **provider** `{Ethers.Provider}` An [ethers.js provider][ether-provider].
-   **Returns** `{Promise<Array<Object>>}` An Array tuple with the two tokens' data.

```js
const {
    getLPTokensDataByLpAddress,
} = require('@thanpolas/uniswap-chain-queries');

// LP of DAI/WETH
const lpAddress = '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11';

const tokensData = await getLPTokensDataByLpAddress(lpAddress, provider);

console.log(tokensData);
// [
//     {
//         address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
//         name: 'Wrapped Ether',
//         symbol: 'WETH',
//         decimals: 18,
//         chainId: 1,
//         network: 'homestead',
//     }
//     {
//         address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
//         name: 'Dai Stablecoin',
//         symbol: 'DAI',
//         decimals: 18,
//         chainId: 1,
//         network: 'homestead',
//     }
// ]
```

## getLPTokenDecimals(lpContract, provider, optTokenDecimals)

Fetch token decimals from a Liquidity Pool contract of uniswap V2 or V3.

-   **lpContract** `{Ethers.Contract}` Instance of [ethers.js contract][ether-contract].
-   **provider** `{Ethers.Provider}` An [ethers.js provider][ether-provider].
-   **optTokenDecimals** `{Array<number|string>=`} If defined, the function will return this as a result and not perform the on-chain query.
-   **Returns** `{Promise<Array<number>>}` An Array tuple with the two tokens' decimal numbers.

```js
const { getLPTokenDecimals } = require('@thanpolas/uniswap-chain-queries');

const tokensDecimals = await getLPTokenDecimals(lpContract, provider);

console.log(tokensDecimals);
// [18, 18]
```

# Uniswap V2 Queries

## getPriceUniswapV2(lpAddress, provider, optTokenDecimals)

Fetch and calculates prices and reserves from a Uniswap V2 (or clones) Liquidity Pool.

-   **lpAddress** `{string}` Address of the Liquidity Pool.
-   **provider** `{Ethers.Provider}` An [ethers.js provider][ether-provider].
-   **optTokenDecimals** `{Array<number|string>=`} token decimals are required to calculate prices and reserves properly, if you have them already and provide them, a query will not be performed to fetch the tokens' decimals.
-   **Returns** `{Promise<Array<number>>}` An Array tuple with the two tokens' decimal numbers.

```js
const { getPriceUniswapV2 } = require('@thanpolas/uniswap-chain-queries');

// LP of DAI/WETH
const lpAddress = '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11';

const tokenPairPrice = await getPriceUniswapV2(lpAddress, provider, [18, 18]);

console.log(tokenPairPrice);
// {
//     price: '3327.24702',
//     priceFormatted: '3,327.24702',
//     priceRev: '0.00030055',
//     priceRevFormatted: '0.00030055',
//     token0Reserves: '40696198.40005',
//     token1Reserves: '12231.19237',
//     token0ReservesFormatted: '40,696,198.4',
//     token1ReservesFormatted: '12,231.19',
//     lpAddress: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
// }
```

## queryFactoryForLPUniV2(factoryAddress, provider, tokenPair)

Will return the Uniswap V2 (or clones) Liquidity Pool for the given token pair.

-   **factoryAddress** `{string}` Address of Uniswap V2 Factory (or clones).
-   **provider** `{Ethers.Provider}` An [ethers.js provider][ether-provider].
-   **tokenPair** `{Array<string>`} Array tuple with the token pair addresses.
-   **Returns** `{Promise<Array<string>>}` An Array with the LP address if found, empty array if not.

```js
const { queryFactoryForLPUniV2 } = require('@thanpolas/uniswap-chain-queries');

// Uniswap V2 Factory on mainsted
const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
const tokenPair = [
    '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
];

const lpAddress = await queryFactoryForLPUniV2(
    factoryAddress,
    provider,
    tokenPair,
);

console.log(lpAddress);
// [ "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11" ]
```

# Uniswap V3 Queries

## getPriceUniswapV3(lpAddress, provider, optTokenDecimals)

Fetch and calculates prices and reserves from a Uniswap V3 Liquidity Pool.

-   **lpAddress** `{string}` Address of the Liquidity Pool.
-   **provider** `{Ethers.Provider}` An [ethers.js provider][ether-provider].
-   **optTokenDecimals** `{Array<number|string>=`} token decimals are required to calculate prices and reserves properly, if you have them already and provide them, a query will not be performed to fetch the tokens' decimals.
-   **Returns** `{Promise<Array<number>>}` An Array tuple with the two tokens' decimal numbers.

```js
const { getPriceUniswapV3 } = require('@thanpolas/uniswap-chain-queries');

// Uni V3 LP of DAI/WETH at 0.3% Fee
const lpAddress = '0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8';

const tokenPairPrice = await getPriceUniswapV3(lpAddress, provider, [18, 18]);

console.log(tokenPairPrice);
// {
//     price: '3338.22446',
//     priceFormatted: '3,338.22446',
//     priceRev: '0.00029956',
//     priceRevFormatted: '0.00029956',
//     fee: '0.3%',
//     token0Reserves: '364612.40140',
//     token1Reserves: '303.24597',
//     token0ReservesFormatted: '364,612.4014',
//     token1ReservesFormatted: '303.24597',
//     lpAddress: '0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8',
// }
```

## queryFactoryForLPUniV3(factoryAddress, provider, tokenPair)

Will return the Uniswap V3 Liquidity Pools for the given token pair. Pools is in plural as it will query and fetch pools for all three of the V3 Fee tiers (0.3%, 0.5% and 1%).

-   **factoryAddress** `{string}` Address of Uniswap V2 Factory (or clones).
-   **provider** `{Ethers.Provider}` An [ethers.js provider][ether-provider].
-   **tokenPair** `{Array<string>`} Array tuple with the token pair addresses.
-   **Returns** `{Promise<Array<string>>}` An Array with the LP address if found, empty array if not.

```js
const { queryFactoryForLPUniV3 } = require('@thanpolas/uniswap-chain-queries');

// Uniswap V3 Factory on mainsted
const factoryAddress = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
const tokenPair = [
    '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
];

const lpAddresses = await queryFactoryForLPUniV3(
    factoryAddress,
    provider,
    tokenPair,
);

console.log(lpAddresses);
// [
//     '0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8',
//     '0x60594a405d53811d3bc4766596efd80fd545a270',
//     '0xa80964c5bbd1a0e95777094420555fead1a26c1e',
// ]
```

---

# Maintenance & Development

## Update Node Version

When a new node version is available you need to updated it in the following:

-   `/package.json`
-   `/.nvmrc`
-   `/.circleci/config.yml`

## Releasing

1. Update the changelog bellow ("Release History").
1. Ensure you are on master and your repository is clean.
1. Type: `npm run release` for patch version jump.
    - `npm run release:minor` for minor version jump.
    - `npm run release:major` for major major jump.

## Release History

-   **v0.1.1**, _30 Aug 2021_
    -   Fixed broken `queryFactoryForLPUniV3()` function that did not use the token tuple argument appropriately.
-   **v0.1.0**, _24 Aug 2021_
    -   **Breaking** Renamed `queryFactoryForLPuniswapv3()` to `queryFactoryForLPUniV3()`.
    -   Added API surface tests.
-   **v0.0.1**, _23 Aug 2021_
    -   Big Bang

## License

Copyright © [Thanos Polychronakis][thanpolas] and Authors, [Licensed under ISC](/LICENSE).

[npm-image]: https://img.shields.io/npm/v/@thanpolas/uniswap-chain-queries.svg
[npm-url]: https://npmjs.org/package/@thanpolas/uniswap-chain-queries
[thanpolas]: https://github.com/thanpolas
[ether-provider]: https://docs.ethers.io/v5/api/providers/
[ether-contract]: https://docs.ethers.io/v5/api/contract/contract/
[erc20-docs]: #erc20-tokens-queries
[univ2-docs]: #uniswap-v2-queries
[univ3-docs]: #uniswap-v3-queries
[univ3prices]: https://github.com/thanpolas/univ3prices
[crypto-utils]: https://github.com/thanpolas/crypto-utils
