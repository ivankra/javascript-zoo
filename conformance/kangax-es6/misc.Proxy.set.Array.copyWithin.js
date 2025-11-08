// compat-table: ES6 > misc > Proxy, internal 'set' calls (tiny) > Array.prototype.copyWithin
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Array.prototype.copyWithin -> Set -> [[Set]]
  var set = [];
  var p = new Proxy([1,2,3,4,5,6], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
  p.copyWithin(0, 3);
  return set + '' === "0,1,2";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.set.Array.copyWithin.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.set.Array.copyWithin.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.set.Array.copyWithin.js: exception: " + e);
}
