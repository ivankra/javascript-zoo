// compat-table: ES6 > built-ins > Proxy (large) > "has" handler invariants
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  new Proxy({},{});
  // A property cannot be reported as non-existent, if it exists as a
  // non-configurable own property of the target object.
  var proxied = {};
  var proxy = new Proxy(proxied, {
    has: function () {
      passed = true;
      return false;
    }
  });
  Object.defineProperty(proxied, "foo", { value: 2, writable: true, enumerable: true });
  try {
    'foo' in proxy;
    return false;
  } catch(e) {}
  // A property cannot be reported as non-existent, if it exists as an
  // own property of the target object and the target object is not extensible.
  proxied.bar = 2;
  Object.preventExtensions(proxied);
  try {
    'bar' in proxy;
    return false;
  } catch(e) {}
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Proxy.handler.has.invariants.js: OK");
  } else {
    console.log("kangax-es6/Proxy.handler.has.invariants.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.handler.has.invariants.js: exception: " + e);
}
