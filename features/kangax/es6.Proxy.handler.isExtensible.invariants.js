// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// compat-table: ES6 > built-ins > Proxy (large) > "isExtensible" handler invariant
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  new Proxy({},{});
  // [[IsExtensible]] applied to the proxy object must return the same value
  // as [[IsExtensible]] applied to the proxy object's target object with the same argument.
  try {
    Object.isExtensible(new Proxy({}, {
      isExtensible: function (t) {
        passed = true;
        return false;
      }
    }));
    return false;
  } catch(e) {}
  try {
    Object.isExtensible(new Proxy(Object.preventExtensions({}), {
      isExtensible: function (t) {
        return true;
      }
    }));
    return false;
  } catch(e) {}
  return true;
}

try {
  if (testCode()) {
    console.log("es6.Proxy.handler.isExtensible.invariants.js: OK");
  } else {
    console.log("es6.Proxy.handler.isExtensible.invariants.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.handler.isExtensible.invariants.js: FAIL: " + e);
}