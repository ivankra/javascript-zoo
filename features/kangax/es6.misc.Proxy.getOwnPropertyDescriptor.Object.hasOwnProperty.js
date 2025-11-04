// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor
// compat-table: ES6 > misc > Proxy, internal 'getOwnPropertyDescriptor' calls (tiny) > Object.prototype.hasOwnProperty
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Object.prototype.hasOwnProperty -> HasOwnProperty -> [[GetOwnProperty]]
  var gopd = [];
  var p = new Proxy({foo:1, bar:2},
    { getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }});
  p.hasOwnProperty('garply');
  return gopd + '' === "garply";
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.getOwnPropertyDescriptor.Object.hasOwnProperty.js: OK");
  } else {
    console.log("es6.misc.Proxy.getOwnPropertyDescriptor.Object.hasOwnProperty.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.getOwnPropertyDescriptor.Object.hasOwnProperty.js: FAIL: " + e);
}