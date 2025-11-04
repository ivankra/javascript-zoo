// ES6: https://tc39.github.io/ecma262/#sec-sharedarraybuffer.prototype.slice
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/slice
// compat-table: ES2016+ > 2017 features > shared memory and atomics (medium) > SharedArrayBuffer.prototype.slice
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof SharedArrayBuffer.prototype.slice === 'function';
}

try {
  if (testCode()) {
    console.log("es2017.SharedArrayBuffer.prototype.slice.js: OK");
  } else {
    console.log("es2017.SharedArrayBuffer.prototype.slice.js: FAIL");
  }
} catch (e) {
  console.log("es2017.SharedArrayBuffer.prototype.slice.js: FAIL: " + e);
}