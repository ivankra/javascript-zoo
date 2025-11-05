// compat-table: ES6 > built-ins > Symbol (large) > cannot coerce to string or number
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var symbol = Symbol();

  try {
    symbol + "";
    return false;
  }
  catch(e) {}

  try {
    symbol + 0;
    return false;
  } catch(e) {}

  return true;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Symbol.no-coerce.js: OK");
  } else {
    console.log("kangax-es6/Symbol.no-coerce.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Symbol.no-coerce.js: exception: " + e);
}
