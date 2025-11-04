// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/construct
// compat-table: ES6 > built-ins > Proxy (large) > "construct" handler
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
    console.log("es6.Proxy.handler.construct.js: OK");
  } else {
    console.log("es6.Proxy.handler.construct.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.handler.construct.js: FAIL: " + e);
}