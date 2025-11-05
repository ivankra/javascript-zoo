// compat-table: ES6 > misc > Proxy, internal 'getOwnPropertyDescriptor' calls (tiny) > Function.prototype.bind
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Function.prototype.bind -> HasOwnProperty -> [[GetOwnProperty]]
  var gopd = [];
  var p = new Proxy(Function(),
    { getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }});
  p.bind();
  return gopd + '' === "length";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.getOwnPropertyDescriptor.Function.bind.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.getOwnPropertyDescriptor.Function.bind.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.getOwnPropertyDescriptor.Function.bind.js: exception: " + e);
}
