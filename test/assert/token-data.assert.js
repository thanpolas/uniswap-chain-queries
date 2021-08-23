/**
 * @fileoverview Validate getToken() function API assertions.
 */

const assert = (module.exports = {});

/**
 * Determines if the provided object is of type that complies with the API Spec.
 *
 * @param {Object} testObj The object to test.
 * @param {Object} values expected values to test against.
 * @throws {Error} if assertions failed.
 */
assert.assert = (testObj, values) => {
  if (!testObj) {
    throw new Error('Empty object passed on assertion');
  }

  assert.assertProperties(testObj);
  assert.assertTypes(testObj);
  assert.assertValues(testObj, values);
};

/**
 * Assert the test object has the expected properties.
 *
 * @param {Object} testObj The object to test.
 * @throws {Error} if assertions failed.
 */
assert.assertProperties = (testObj) => {
  expect(testObj).toContainAllKeys([
    'address',
    'name',
    'symbol',
    'decimals',
    'chainId',
    'network',
  ]);
};

/**
 * Assert the test object's properties have the expected types.
 *
 * @param {Object} testObj The object to test.
 * @throws {Error} if assertions failed.
 */
assert.assertTypes = (testObj) => {
  expect(testObj.address).toBeString();
  expect(testObj.name).toBeString();
  expect(testObj.symbol).toBeString();
  expect(testObj.decimals).toBeNumber();
  expect(testObj.chainId).toBeNumber();
  expect(testObj.network).toBeString();
};

/**
 * Assert the test object's properties have the expected values.
 *
 * @param {Object} testObj The object to test.
 * @param {Object} values expected values to test against.
 * @throws {Error} if assertions failed.
 */
assert.assertValues = (testObj, values) => {
  expect(testObj.address).toEqual(values.address);
  expect(testObj.name).toEqual(values.name);
  expect(testObj.symbol).toEqual(values.symbol);
  expect(testObj.decimals).toEqual(values.decimals);
  expect(testObj.chainId).toEqual(values.chainId);
  expect(testObj.network).toEqual(values.network);
};
