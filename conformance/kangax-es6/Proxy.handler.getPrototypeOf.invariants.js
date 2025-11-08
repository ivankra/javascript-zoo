// compat-table: ES6 > built-ins > Proxy (large) > "getPrototypeOf" handler invariant
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  new Proxy({},{});
  // If the target object is not extensible, [[GetPrototypeOf]] applied to the proxy object
  // must return the same value as [[GetPrototypeOf]] applied to the proxy object's target object.
  try {
    Object.getPrototypeOf(new Proxy(Object.preventExtensions({}), {
      getPrototypeOf: function () {
        passed = true;
        return {};
      }
    }));
    return false;
  } catch(e) {}
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Proxy.handler.getPrototypeOf.invariants.js: OK");
  } else {
    console.log("kangax-es6/Proxy.handler.getPrototypeOf.invariants.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.handler.getPrototypeOf.invariants.js: exception: " + e);
}
