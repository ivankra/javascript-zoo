// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set
// compat-table: ES6 > misc > Proxy, internal 'set' calls (tiny) > Array.prototype.pop
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Array.prototype.pop -> Set -> [[Set]]
  var set = [];
  var p = new Proxy([], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
  p.pop();
  return set + '' === "length";
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.set.Array.pop.js: OK");
  } else {
    console.log("es6.misc.Proxy.set.Array.pop.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.set.Array.pop.js: FAIL: " + e);
}