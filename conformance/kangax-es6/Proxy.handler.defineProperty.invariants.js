// compat-table: ES6 > built-ins > Proxy (large) > "defineProperty" handler invariants
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  new Proxy({},{});
  // A property cannot be added, if the target object is not extensible.
  var proxied = Object.preventExtensions({});
  var proxy = new Proxy(proxied, {
    defineProperty: function() {
      passed = true;
      return true;
    }
  });
  try {
    Object.defineProperty(proxy, "foo", { value: 2 });
    return false;
  } catch(e) {}
  // A property cannot be non-configurable, unless there exists a corresponding
  // non-configurable own property of the target object.
  try {
    Object.defineProperty(
      new Proxy({ bar: true }, {
        defineProperty: function () {
          return true;
        }
      }),
      "bar",
      { value: 5, configurable: false, writable: true, enumerable: true }
    );
    return false;
  } catch(e) {}
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Proxy.handler.defineProperty.invariants.js: OK");
  } else {
    console.log("kangax-es6/Proxy.handler.defineProperty.invariants.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.handler.defineProperty.invariants.js: exception: " + e);
}
