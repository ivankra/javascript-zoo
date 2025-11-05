// compat-table: ES6 > misc > Proxy, internal 'deleteProperty' calls (tiny) > Array.prototype.unshift
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Array.prototype.unshift -> DeletePropertyOrThrow -> [[Delete]]
  var del = [];
  var p = new Proxy([0,0,,0,,0], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});
  p.unshift(0);
  return del + '' === "5,3";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.deleteProperty.Array.unshift.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.deleteProperty.Array.unshift.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.deleteProperty.Array.unshift.js: exception: " + e);
}
