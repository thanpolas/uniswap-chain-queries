/**
 * @fileoverview Asserts validity of the getLPTokensData() response.
 */

const assert = (module.exports = {});

/**
 * Determines if the provided Array is of type that complies with the API Spec.
 *
 * @param {Array} testArr The Array to test.
 * @throws {Error} if assertions failed.
 */
assert.assert = (testArr) => {
  if (!testArr) {
    throw new Error('Empty Array passed on assertion');
  }

  assert.assertProperties(testArr);
  assert.assertTypes(testArr);
};

/**
 * Assert the test Array has the expected properties.
 *
 * @param {Array} testArr The Array to test.
 * @throws {Error} if assertions failed.
 */
assert.assertProperties = (testArr) => {
  expect(testArr).toBeArray();
  expect(testArr).toHaveLength(2);
};

/**
 * Assert the test Array's properties have the expected types.
 *
 * @param {Array} testArr The Array to test.
 * @throws {Error} if assertions failed.
 */
assert.assertTypes = (testArr) => {
  const [token0, token1] = testArr;
  expect(token0).toBeObject();
  expect(token1).toBeObject();
};
