// compat-table: ES6 > misc > Proxy, internal 'getOwnPropertyDescriptor' calls (tiny) > [[Set]]
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // [[Set]] -> [[GetOwnProperty]]
  var gopd = [];
  var p = new Proxy({},
    { getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }});
  p.foo = 1; p.bar = 1;
  return gopd + '' === "foo,bar";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.getOwnPropertyDescriptor.Set.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.getOwnPropertyDescriptor.Set.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.getOwnPropertyDescriptor.Set.js: exception: " + e);
}
