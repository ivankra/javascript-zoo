// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// compat-table: ES6 > built-ins > Proxy (large) > "construct" handler invariants
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  new Proxy({},{});
  // A Proxy exotic object only has a [[Construct]] internal method if the
  // initial value of its [[ProxyTarget]] internal slot is an object
  // that has a [[Construct]] internal method.
  try {
    new new Proxy({}, {
      construct: function (t, args) {
        return {};
      }
    })();
    return false;
  } catch(e) {}
  // The result of [[Construct]] must be an Object.
  try {
    new new Proxy(function(){}, {
      construct: function (t, args) {
        passed = true;
        return 5;
      }
    })();
    return false;
  } catch(e) {}
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Proxy.handler.construct.invariants.js: OK");
  } else {
    console.log("es6.Proxy.handler.construct.invariants.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.handler.construct.invariants.js: FAIL: " + e);
}