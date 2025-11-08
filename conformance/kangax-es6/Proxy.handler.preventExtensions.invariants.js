// compat-table: ES6 > built-ins > Proxy (large) > "preventExtensions" handler invariant
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  new Proxy({},{});
  // [[PreventExtensions]] applied to the proxy object only returns true
  // if [[IsExtensible]] applied to the proxy object's target object is false.
  try {
    Object.preventExtensions(new Proxy({}, {
      preventExtensions: function () {
        passed = true;
        return true;
      }
    }));
    return false;
  } catch(e) {}
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Proxy.handler.preventExtensions.invariants.js: OK");
  } else {
    console.log("kangax-es6/Proxy.handler.preventExtensions.invariants.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.handler.preventExtensions.invariants.js: exception: " + e);
}
