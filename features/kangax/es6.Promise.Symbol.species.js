// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// compat-table: ES6 > built-ins > Promise (large) > Promise[Symbol.species]
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var prop = Object.getOwnPropertyDescriptor(Promise, Symbol.species);
  return 'get' in prop && Promise[Symbol.species] === Promise;
}

try {
  if (testCode()) {
    console.log("es6.Promise.Symbol.species.js: OK");
  } else {
    console.log("es6.Promise.Symbol.species.js: FAIL");
  }
} catch (e) {
  console.log("es6.Promise.Symbol.species.js: FAIL: " + e);
}