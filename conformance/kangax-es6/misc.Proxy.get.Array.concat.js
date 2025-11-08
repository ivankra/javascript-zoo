// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > Array.prototype.concat
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Array.prototype.concat -> Get -> [[Get]]
  var get = [];
  var arr = [1];
  arr.constructor = void undefined;
  var p = new Proxy(arr, { get: function(o, k) { get.push(k); return o[k]; }});
  Array.prototype.concat.call(p,p);
  return get[0] === "constructor"
    && get[1] === Symbol.isConcatSpreadable
    && get[2] === "length"
    && get[3] === "0"
    && get[4] === get[1] && get[5] === get[2] && get[6] === get[3]
    && get.length === 7;
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.get.Array.concat.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.get.Array.concat.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.get.Array.concat.js: exception: " + e);
}
