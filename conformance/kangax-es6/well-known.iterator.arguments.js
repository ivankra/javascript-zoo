// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.iterator, arguments object
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
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
    console.log("kangax-es6/well-known.iterator.arguments.js: OK");
  } else {
    console.log("kangax-es6/well-known.iterator.arguments.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/well-known.iterator.arguments.js: exception: " + e);
}
