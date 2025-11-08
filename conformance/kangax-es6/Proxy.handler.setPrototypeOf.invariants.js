// compat-table: ES6 > built-ins > Proxy (large) > "setPrototypeOf" handler invariant
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  new Proxy({},{});
  Object.setPrototypeOf({},{});
  // If the target object is not extensible, the argument value must be the
  // same as the result of [[GetPrototypeOf]] applied to target object.
  try {
    Object.setPrototypeOf(
      new Proxy(Object.preventExtensions({}), {
        setPrototypeOf: function () {
          passed = true;
          return true;
        }
      }),{});
    return false;
  } catch(e) {}
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Proxy.handler.setPrototypeOf.invariants.js: OK");
  } else {
    console.log("kangax-es6/Proxy.handler.setPrototypeOf.invariants.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.handler.setPrototypeOf.invariants.js: exception: " + e);
}
