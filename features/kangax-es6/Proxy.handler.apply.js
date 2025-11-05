// compat-table: ES6 > built-ins > Proxy (large) > "apply" handler
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/apply
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var proxied = function(){};
  var passed = false;
  var host = {
    method: new Proxy(proxied, {
      apply: function (t, thisArg, args) {
        passed = t === proxied && thisArg === host && args + "" === "foo,bar";
      }
    })
  };
  host.method("foo", "bar");
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Proxy.handler.apply.js: OK");
  } else {
    console.log("kangax-es6/Proxy.handler.apply.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.handler.apply.js: exception: " + e);
}
