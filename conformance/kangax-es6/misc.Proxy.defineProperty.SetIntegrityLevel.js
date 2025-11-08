// compat-table: ES6 > misc > Proxy, internal 'defineProperty' calls (tiny) > SetIntegrityLevel
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // SetIntegrityLevel -> DefinePropertyOrThrow -> [[DefineOwnProperty]]
  var def = [];
  var p = new Proxy({foo:1, bar:2}, { defineProperty: function(o, v, desc) { def.push(v); Object.defineProperty(o, v, desc); return true; }});
  Object.freeze(p);
  return def + '' === "foo,bar";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.defineProperty.SetIntegrityLevel.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.defineProperty.SetIntegrityLevel.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.defineProperty.SetIntegrityLevel.js: exception: " + e);
}
