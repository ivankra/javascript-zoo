// compat-table: ES6 > misc > Proxy, internal 'set' calls (tiny) > Object.assign
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Object.assign -> Set -> [[Set]]
  var set = [];
  var p = new Proxy({}, { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
  Object.assign(p, { foo: 1, bar: 2 });
  return set + '' === "foo,bar";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.set.Object.assign.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.set.Object.assign.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.set.Object.assign.js: exception: " + e);
}
