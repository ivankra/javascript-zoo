// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// compat-table: ES6 > built-ins > Proxy (large) > "deleteProperty" handler invariant
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  new Proxy({},{});
  // A property cannot be reported as deleted, if it exists as a non-configurable
  // own property of the target object.
  var proxied = {};
  Object.defineProperty(proxied, "foo", { value: 2, writable: true, enumerable: true });
  try {
    delete new Proxy(proxied, {
      deleteProperty: function () {
        passed = true;
        return true;
      }
    }).foo;
    return false;
  } catch(e) {}
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Proxy.handler.deleteProperty.invariants.js: OK");
  } else {
    console.log("es6.Proxy.handler.deleteProperty.invariants.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.handler.deleteProperty.invariants.js: FAIL: " + e);
}