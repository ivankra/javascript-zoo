// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty
// compat-table: ES6 > built-ins > Proxy (large) > "defineProperty" handler
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var proxied = {};
  var passed = false;
  Object.defineProperty(
    new Proxy(proxied, {
      defineProperty: function (t, k, d) {
        passed = t === proxied && k === "foo" && d.value === 5;
        return true;
      }
    }),
    "foo",
    { value: 5, configurable: true }
  );
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Proxy.handler.defineProperty.js: OK");
  } else {
    console.log("es6.Proxy.handler.defineProperty.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.handler.defineProperty.js: FAIL: " + e);
}