// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.match, RegExp constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var re = /./;
  re[Symbol.match] = false;
  var foo = {constructor: RegExp};
  foo[Symbol.match] = true;
  return RegExp(re) !== re && RegExp(foo) === foo;
}

try {
  if (testCode()) {
    console.log("es6.well-known.match.RegExp-constructor.js: OK");
  } else {
    console.log("es6.well-known.match.RegExp-constructor.js: FAIL");
  }
} catch (e) {
  console.log("es6.well-known.match.RegExp-constructor.js: FAIL: " + e);
}