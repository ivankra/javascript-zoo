// compat-table: ES6 > built-ins > Symbol (large) > global symbol registry
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var symbol = Symbol.for('foo');
  return Symbol.for('foo') === symbol &&
     Symbol.keyFor(symbol) === 'foo';
}

try {
  if (testCode()) {
    console.log("kangax-es6/Symbol.global-registry.js: OK");
  } else {
    console.log("kangax-es6/Symbol.global-registry.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Symbol.global-registry.js: exception: " + e);
}
