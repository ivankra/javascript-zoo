// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.hasInstance
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  var obj = { foo: true };
  var C = function(){};
  Object.defineProperty(C, Symbol.hasInstance, {
    value: function(inst) { passed = inst.foo; return false; }
  });
  obj instanceof C;
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/well-known.hasInstance.js: OK");
  } else {
    console.log("kangax-es6/well-known.hasInstance.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/well-known.hasInstance.js: exception: " + e);
}
