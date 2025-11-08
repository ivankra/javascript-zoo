// compat-table: ES6 > misc > Proxy, internal 'set' calls (tiny) > Array.from
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Array.from -> Set -> [[Set]]
  var set = [];
  var p = new Proxy({}, { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
  Array.from.call(function(){ return p; }, {length:2, 0:1, 1:2});
  return set + '' === "length";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.set.Array.from.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.set.Array.from.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.set.Array.from.js: exception: " + e);
}
