// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// compat-table: ES6 > built-ins > Proxy (large) > "set" handler invariants
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  new Proxy({},{});
  // Cannot change the value of a property to be different from the value of
  // the corresponding target object if the corresponding target object
  // property is a non-writable, non-configurable own data property.
  var proxied = {};
  var proxy = new Proxy(proxied, {
    set: function () {
      passed = true;
      return true;
    }
  });
  Object.defineProperty(proxied, "foo", { value: 2, enumerable: true });
  proxy.foo = 2;
  try {
    proxy.foo = 4;
    return false;
  } catch(e) {}
  // Cannot set the value of a property if the corresponding target
  // object property is a non-configurable own accessor property
  // that has undefined as its [[Set]] attribute.
  Object.defineProperty(proxied, "bar",
    { get: function(){}, enumerable: true });
  try {
    proxy.bar = 2;
    return false;
  } catch(e) {}
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Proxy.handler.set.invariants.js: OK");
  } else {
    console.log("es6.Proxy.handler.set.invariants.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.handler.set.invariants.js: FAIL: " + e);
}