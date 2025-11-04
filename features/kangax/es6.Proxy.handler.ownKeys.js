// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/ownKeys
// compat-table: ES6 > built-ins > Proxy (large) > "ownKeys" handler
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var proxied = {};
  var passed = false;
  Object.keys(
    new Proxy(proxied, {
      ownKeys: function (t) {
        passed = t === proxied; return [];
      }
    })
  );
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Proxy.handler.ownKeys.js: OK");
  } else {
    console.log("es6.Proxy.handler.ownKeys.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.handler.ownKeys.js: FAIL: " + e);
}