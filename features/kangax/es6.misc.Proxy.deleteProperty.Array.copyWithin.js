// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty
// compat-table: ES6 > misc > Proxy, internal 'deleteProperty' calls (tiny) > Array.prototype.copyWithin
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Array.prototype.copyWithin -> DeletePropertyOrThrow -> [[Delete]]
  var del = [];
  var p = new Proxy([0,0,0,,,,], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});
  p.copyWithin(0,3);
  return del + '' === "0,1,2";
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.deleteProperty.Array.copyWithin.js: OK");
  } else {
    console.log("es6.misc.Proxy.deleteProperty.Array.copyWithin.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.deleteProperty.Array.copyWithin.js: FAIL: " + e);
}