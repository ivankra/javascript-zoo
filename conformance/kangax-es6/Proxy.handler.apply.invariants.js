// compat-table: ES6 > built-ins > Proxy (large) > "apply" handler invariant
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
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
    console.log("kangax-es6/Proxy.handler.apply.invariants.js: OK");
  } else {
    console.log("kangax-es6/Proxy.handler.apply.invariants.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.handler.apply.invariants.js: exception: " + e);
}
