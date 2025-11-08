// compat-table: ES6 > syntax > template literals (large) > passed array is frozen
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-template-literals
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function(parts) {
    return Object.isFrozen(parts) && Object.isFrozen(parts.raw);
  }) `foo${0}bar${0}baz`;
}

try {
  if (testCode()) {
    console.log("kangax-es6/template.frozen-array.js: OK");
  } else {
    console.log("kangax-es6/template.frozen-array.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/template.frozen-array.js: exception: " + e);
}
