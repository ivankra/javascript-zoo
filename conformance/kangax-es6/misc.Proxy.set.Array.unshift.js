// compat-table: ES6 > misc > Proxy, internal 'set' calls (tiny) > Array.prototype.unshift
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Array.prototype.unshift -> Set -> [[Set]]
  var set = [];
  var p = new Proxy([0,0,,0], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
  p.unshift(0,1);
  return set + '' === "5,3,2,0,1,length";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.set.Array.unshift.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.set.Array.unshift.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.set.Array.unshift.js: exception: " + e);
}
