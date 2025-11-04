// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.match, String.prototype.includes
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var re = /./;
  try {
    '/./'.includes(re);
  } catch(e){
    re[Symbol.match] = false;
    return '/./'.includes(re);
  }
}

try {
  if (testCode()) {
    console.log("es6.well-known.match.String.includes.js: OK");
  } else {
    console.log("es6.well-known.match.String.includes.js: FAIL");
  }
} catch (e) {
  console.log("es6.well-known.match.String.includes.js: FAIL: " + e);
}