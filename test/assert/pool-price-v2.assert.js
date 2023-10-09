/**
 * @fileoverview getPriceUniswapV2() API assertions.
 */

const assert = (module.exports = {});

/**
 * Determines if the provided object is of type that complies with the API Spec.
 *
 * @param {Object} testObj The object to test.
 * @param {Object=} optValues Values to check against.
 * @throws {Error} if assertions failed.
 */
assert.assert = (testObj, optValues) => {
  if (!testObj) {
    throw new Error('Empty object passed on assertion');
  }

  assert.assertProperties(testObj);
  assert.assertTypes(testObj);
  assert.assertValues(testObj, optValues);
};

/**
 * Assert the test object has the expected properties.
 *
 * @param {Object} testObj The object to test.
 * @throws {Error} if assertions failed.
 */
assert.assertProperties = (testObj) => {
  expect(testObj).toContainAllKeys([
    'price',
    'priceFormatted',
    'priceRev',
    'priceRevFormatted',
    'token0ReservesBI',
    'token1ReservesBI',
    'token0Reserves',
    'token1Reserves',
    'token0ReservesFormatted',
    'token1ReservesFormatted',
    'lpAddress',
  ]);
};

/**
 * Assert the test object's properties have the expected types.
 *
 * @param {Object} testObj The object to test.
 * @throws {Error} if assertions failed.
 */
assert.assertTypes = (testObj) => {
  expect(testObj.price).toBeString();
  expect(testObj.priceFormatted).toBeString();
  expect(testObj.priceRev).toBeString();
  expect(testObj.priceRevFormatted).toBeString();
  expect(testObj.token0Reserves).toBeString();
  expect(testObj.token1Reserves).toBeString();
  expect(testObj.token0ReservesFormatted).toBeString();
  expect(testObj.token1ReservesFormatted).toBeString();
  expect(testObj.lpAddress).toBeString();
};

/**
 * Assert the test object's properties have the expected values.
 *
 * @param {Object} testObj The object to test.
 * @param {Object=} optValues Values to check against.
 * @throws {Error} if assertions failed.
 */
assert.assertValues = (testObj, optValues) => {
  if (optValues) {
    expect(testObj.price).toEqual(optValues.price);
    expect(testObj.priceFormatted).toEqual(optValues.priceFormatted);
    expect(testObj.priceRev).toEqual(optValues.priceRev);
    expect(testObj.priceRevFormatted).toEqual(optValues.priceRevFormatted);
    expect(testObj.token0Reserves).toEqual(optValues.token0Reserves);
    expect(testObj.token1Reserves).toEqual(optValues.token1Reserves);
    expect(testObj.token0ReservesFormatted).toEqual(
      optValues.token0ReservesFormatted,
    );
    expect(testObj.token1ReservesFormatted).toEqual(
      optValues.token1ReservesFormatted,
    );
    expect(testObj.lpAddress).toEqual(optValues.lpAddress);
  }
};
