# Uniswap Chain Queries

> On chain queries for ERC20 Tokens, Uniswap V2 and V3

[![NPM Version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/thanpolas/uniswap-chain-queries.svg?style=svg)](https://circleci.com/gh/thanpolas/uniswap-chain-queries)
[![Discord](https://img.shields.io/discord/847075821276758096?label=discord&color=CBE9F0)](https://discord.gg/GkyEqzJWEY)
[![Twitter Follow](https://img.shields.io/twitter/follow/thanpolas.svg?label=thanpolas&style=social)](https://twitter.com/thanpolas)

## Features

This library will allow you to:

-   [Query on-chain ERC20 tokens for their Data][erc20-docs].
-   [Query on-chain for Uniswap V2 Liquidity Pools and fetch prices for a token pair][univ2-docs].
-   [Query on-chain for Uniswap V3 Liquidity Pools and fetch prices for a token pair][univ3-docs].

## Install

Install the module using NPM:

```
npm install @thanpolas/uniswap-chain-queries --save
```

## Query ERC20 Tokens

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

-   **v0.0.1**, _TBD_
    -   Big Bang

## License

Copyright © [Thanos Polychronakis][thanpolas] and Authors, [Licensed under ISC](/LICENSE).

[![CircleCI](https://circleci.com/gh/thanpolas/awesomelib/tree/main.svg?style=svg)](https://circleci.com/gh/thanpolas/awesomelib/tree/main)

[npm-url]: https://npmjs.org/package/@thanpolas/uniswap-chain-queries
[thanpolas]: https://github.com/thanpolas
