// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > ToPropertyDescriptor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // ToPropertyDescriptor -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({
      enumerable: true, configurable: true, value: true,
      writable: true, get: Function(), set: Function()
    }, { get: function(o, k) { get.push(k); return o[k]; }});
  try {
    // This will throw, since it will have true for both "get" and "value",
    // but not before performing a Get on every property.
    Object.defineProperty({}, "foo", p);
  } catch(e) {
    return get + '' === "enumerable,configurable,value,writable,get,set";
  }
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.get.ToPropertyDescriptor.js: OK");
  } else {
    console.log("es6.misc.Proxy.get.ToPropertyDescriptor.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.get.ToPropertyDescriptor.js: FAIL: " + e);
}