// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty
// compat-table: ES6 > misc > Proxy, internal 'deleteProperty' calls (tiny) > Array.prototype.reverse
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Array.prototype.reverse -> DeletePropertyOrThrow -> [[Delete]]
  var del = [];
  var p = new Proxy([0,,2,,4,,], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});
  p.reverse();
  return del + '' === "0,4,2";
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.deleteProperty.Array.reverse.js: OK");
  } else {
    console.log("es6.misc.Proxy.deleteProperty.Array.reverse.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.deleteProperty.Array.reverse.js: FAIL: " + e);
}