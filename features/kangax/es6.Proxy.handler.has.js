// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/has
// compat-table: ES6 > built-ins > Proxy (large) > "has" handler
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var proxied = {};
  var passed = false;
  "foo" in new Proxy(proxied, {
    has: function (t, k) {
      passed = t === proxied && k === "foo";
    }
  });
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Proxy.handler.has.js: OK");
  } else {
    console.log("es6.Proxy.handler.has.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.handler.has.js: FAIL: " + e);
}