/**
 * @fileoverview Fixtures for price results, used for validation.
 */

const fix = (module.exports = {});

fix.uniV2_dai_weth = () => {
  return {
    price: '3327.24702',
    priceFormatted: '3,327.24702',
    priceRev: '0.00030055',
    priceRevFormatted: '0.00030055',
    token0Reserves: '40696198.40005',
    token1Reserves: '12231.19237',
    token0ReservesFormatted: '40,696,198.4',
    token1ReservesFormatted: '12,231.19',
    lpAddress: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  };
};

fix.uniV3_dai_weth = () => {
  return {
    price: '3338.22446',
    priceFormatted: '3,338.22446',
    priceRev: '0.00029956',
    priceRevFormatted: '0.00029956',
    fee: '0.3%',
    token0Reserves: '364612.40140',
    token1Reserves: '303.24597',
    token0ReservesFormatted: '364,612.4014',
    token1ReservesFormatted: '303.24597',
    lpAddress: '0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8',
  };
};
