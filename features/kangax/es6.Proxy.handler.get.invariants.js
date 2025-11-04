// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// compat-table: ES6 > built-ins > Proxy (large) > "get" handler invariants
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  var proxied = { };
  var proxy = new Proxy(proxied, {
    get: function () {
      passed = true;
      return 4;
    }
  });
  // The value reported for a property must be the same as the value of the corresponding
  // target object property if the target object property is a non-writable,
  // non-configurable own data property.
  Object.defineProperty(proxied, "foo", { value: 5, enumerable: true });
  try {
    proxy.foo;
    return false;
  }
  catch(e) {}
  // The value reported for a property must be undefined if the corresponding target
  // object property is a non-configurable own accessor property that has undefined
  // as its [[Get]] attribute.
  Object.defineProperty(proxied, "bar",
    { set: function(){}, enumerable: true });
  try {
    proxy.bar;
    return false;
  }
  catch(e) {}
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Proxy.handler.get.invariants.js: OK");
  } else {
    console.log("es6.Proxy.handler.get.invariants.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.handler.get.invariants.js: FAIL: " + e);
}