// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// compat-table: ES6 > built-ins > Proxy (large) > "apply" handler invariant
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  new Proxy(function(){}, {
      apply: function () { passed = true; }
  })();
  // A Proxy exotic object only has a [[Call]] internal method if the
  // initial value of its [[ProxyTarget]] internal slot is an object
  // that has a [[Call]] internal method.
  try {
    new Proxy({}, {
      apply: function () {}
    })();
    return false;
  } catch(e) {}
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Proxy.handler.apply.invariants.js: OK");
  } else {
    console.log("es6.Proxy.handler.apply.invariants.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.handler.apply.invariants.js: FAIL: " + e);
}