// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// compat-table: ES6 > built-ins > Proxy (large) > "get" handler
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var proxied = { };
  var proxy = new Proxy(proxied, {
    get: function (t, k, r) {
      return t === proxied && k === "foo" && r === proxy && 5;
    }
  });
  return proxy.foo === 5;
}

try {
  if (testCode()) {
    console.log("es6.Proxy.handler.get.js: OK");
  } else {
    console.log("es6.Proxy.handler.get.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.handler.get.js: FAIL: " + e);
}