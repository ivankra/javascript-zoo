// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// compat-table: ES6 > built-ins > Proxy (large) > "set" handler, instances of proxies
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var proxied = { };
  var passed = false;
  var proxy = Object.create(new Proxy(proxied, {
    set: function (t, k, v, r) {
      passed = t === proxied && k + v === "foobar" && r === proxy;
    }
  }));
  proxy.foo = "bar";
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Proxy.handler.set.instances.js: OK");
  } else {
    console.log("es6.Proxy.handler.set.instances.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.handler.set.instances.js: FAIL: " + e);
}