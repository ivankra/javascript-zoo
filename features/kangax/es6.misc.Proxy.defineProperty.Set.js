// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty
// compat-table: ES6 > misc > Proxy, internal 'defineProperty' calls (tiny) > [[Set]]
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // [[Set]] -> [[DefineOwnProperty]]
  var def = [];
  var p = new Proxy({foo:1, bar:2}, { defineProperty: function(o, v, desc) { def.push(v); Object.defineProperty(o, v, desc); return true; }});
  p.foo = 2; p.bar = 4;
  return def + '' === "foo,bar";
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.defineProperty.Set.js: OK");
  } else {
    console.log("es6.misc.Proxy.defineProperty.Set.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.defineProperty.Set.js: FAIL: " + e);
}