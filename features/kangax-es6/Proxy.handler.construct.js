// compat-table: ES6 > built-ins > Proxy (large) > "construct" handler
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/construct
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var proxied = function(){};
  var passed = false;
  new new Proxy(proxied, {
    construct: function (t, args) {
      passed = t === proxied && args + "" === "foo,bar";
      return {};
    }
  })("foo","bar");
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Proxy.handler.construct.js: OK");
  } else {
    console.log("kangax-es6/Proxy.handler.construct.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.handler.construct.js: exception: " + e);
}
