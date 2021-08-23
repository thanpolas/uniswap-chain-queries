/**
 * @fileoverview Ether.js provider related fixtures.
 */

const fix = (module.exports = {});

fix.providerNetworkFix = () => {
  return {
    chainId: 1,
    ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    name: 'homestead',
  };
};
