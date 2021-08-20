/**
 * @fileoverview Functions related to ERC20 token contracts.
 */

const { getToken } = require('./logic/get-token.ent');

const entity = (module.exports = {});

entity.getToken = getToken;
