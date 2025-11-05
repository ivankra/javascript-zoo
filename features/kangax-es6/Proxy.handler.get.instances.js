// compat-table: ES6 > built-ins > Proxy (large) > "get" handler, instances of proxies
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var proxied = { };
  var proxy = Object.create(new Proxy(proxied, {
    get: function (t, k, r) {
      return t === proxied && k === "foo" && r === proxy && 5;
    }
  }));
  return proxy.foo === 5;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Proxy.handler.get.instances.js: OK");
  } else {
    console.log("kangax-es6/Proxy.handler.get.instances.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.handler.get.instances.js: exception: " + e);
}
