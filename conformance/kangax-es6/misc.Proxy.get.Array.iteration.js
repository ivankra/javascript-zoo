// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > Array.prototype iteration methods
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Array.prototype methods -> Get -> [[Get]]
  var methods = ['copyWithin', 'every', 'fill', 'filter', 'find', 'findIndex', 'forEach',
    'indexOf', 'join', 'lastIndexOf', 'map', 'reduce', 'reduceRight', 'some'];
  var get;
  var p = new Proxy({length: 2, 0: '', 1: ''}, { get: function(o, k) { get.push(k); return o[k]; }});
  for(var i = 0; i < methods.length; i+=1) {
    get = [];
    Array.prototype[methods[i]].call(p, Function());
    if (get + '' !== (
      methods[i] === 'fill' ? "length" :
      methods[i] === 'every' ? "length,0" :
      methods[i] === 'lastIndexOf' || methods[i] === 'reduceRight' ? "length,1,0" :
      "length,0,1"
    )) {
      return false;
    }
  }
  return true;
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.get.Array.iteration.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.get.Array.iteration.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.get.Array.iteration.js: exception: " + e);
}
