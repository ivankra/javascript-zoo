// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.iterator, arguments object
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function() {
    return typeof arguments[Symbol.iterator] === 'function'
      && Object.hasOwnProperty.call(arguments, Symbol.iterator);
  }());
}

try {
  if (testCode()) {
    console.log("es6.well-known.iterator.arguments.js: OK");
  } else {
    console.log("es6.well-known.iterator.arguments.js: FAIL");
  }
} catch (e) {
  console.log("es6.well-known.iterator.arguments.js: FAIL: " + e);
}