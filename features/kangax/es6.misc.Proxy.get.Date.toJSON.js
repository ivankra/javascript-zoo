// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > Date.prototype.toJSON
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Date.prototype.toJSON -> ToPrimitive -> Get -> [[Get]]
  // Date.prototype.toJSON -> Invoke -> GetMethod -> GetV -> [[Get]]
  var get = [];
  var p = new Proxy({toString:Function(),toISOString:Function()}, { get: function(o, k) { get.push(k); return o[k]; }});
  Date.prototype.toJSON.call(p);
  return get[0] === Symbol.toPrimitive && get.slice(1) + '' === "valueOf,toString,toISOString";
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.get.Date.toJSON.js: OK");
  } else {
    console.log("es6.misc.Proxy.get.Date.toJSON.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.get.Date.toJSON.js: FAIL: " + e);
}