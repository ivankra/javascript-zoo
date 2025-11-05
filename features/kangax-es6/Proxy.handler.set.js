// compat-table: ES6 > built-ins > Proxy (large) > "set" handler
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var proxied = { };
  var passed = false;
  var proxy = new Proxy(proxied, {
    set: function (t, k, v, r) {
      passed = t === proxied && k + v === "foobar" && r === proxy;
    }
  });
  proxy.foo = "bar";
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Proxy.handler.set.js: OK");
  } else {
    console.log("kangax-es6/Proxy.handler.set.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.handler.set.js: exception: " + e);
}
