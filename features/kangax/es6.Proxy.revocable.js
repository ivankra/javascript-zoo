// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable
// compat-table: ES6 > built-ins > Proxy (large) > Proxy.revocable
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = Proxy.revocable({}, { get: function() { return 5; } });
  var passed = (obj.proxy.foo === 5);
  obj.revoke();
  try {
    obj.proxy.foo;
  } catch(e) {
    passed &= e instanceof TypeError;
  }
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Proxy.revocable.js: OK");
  } else {
    console.log("es6.Proxy.revocable.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.revocable.js: FAIL: " + e);
}