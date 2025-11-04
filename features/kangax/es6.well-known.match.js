// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/match
// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.match
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var O = {};
  O[Symbol.match] = function(){
    return 42;
  };
  return ''.match(O) === 42;
}

try {
  if (testCode()) {
    console.log("es6.well-known.match.js: OK");
  } else {
    console.log("es6.well-known.match.js: FAIL");
  }
} catch (e) {
  console.log("es6.well-known.match.js: FAIL: " + e);
}