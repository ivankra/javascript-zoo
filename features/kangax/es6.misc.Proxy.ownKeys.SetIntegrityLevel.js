// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/ownKeys
// compat-table: ES6 > misc > Proxy, internal 'ownKeys' calls (tiny) > SetIntegrityLevel
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // SetIntegrityLevel -> [[OwnPropertyKeys]]
  var ownKeysCalled = 0;
  var p = new Proxy({}, { ownKeys: function(o) { ownKeysCalled++; return Object.keys(o); }});
  Object.freeze(p);
  return ownKeysCalled === 1;
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.ownKeys.SetIntegrityLevel.js: OK");
  } else {
    console.log("es6.misc.Proxy.ownKeys.SetIntegrityLevel.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.ownKeys.SetIntegrityLevel.js: FAIL: " + e);
}