// compat-table: ES5 > String properties and methods (small) > String.prototype.split
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // all of these tests reflect bugs that es5-shim patches
  return typeof String.prototype.split === 'function'
    && ''.split().length === 1 && ''.split()[0] === ''
    && ''.split(undefined).length === 1 && ''.split(undefined)[0] === ''
    && 'ab'.split().length === 1 && 'ab'.split()[0] === 'ab'
    && 'ab'.split(undefined).length === 1 && 'ab'.split(undefined)[0] === 'ab'
    && '0'.split(undefined, 0).length === 0
    && 'ab'.split(/(?:ab)*/).length === 2
    && '.'.split(/(.?)(.?)/).length === 4
    && 'tesst'.split(/(s)*/)[1] !== 't'
    && 'test'.split(/(?:)/, -1).length === 4
    && ''.split(/.?/).length === 0
    && '.'.split(/()()/).length === 1;
}

try {
  if (testCode()) {
    console.log("kangax-es5/String.prototype.split.js: OK");
  } else {
    console.log("kangax-es5/String.prototype.split.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/String.prototype.split.js: exception: " + e);
}
