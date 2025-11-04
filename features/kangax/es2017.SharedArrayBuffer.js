// ES6: https://tc39.github.io/ecma262/#sec-sharedarraybuffer-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
// compat-table: ES2016+ > 2017 features > shared memory and atomics (medium) > SharedArrayBuffer
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof SharedArrayBuffer === 'function';
}

try {
  if (testCode()) {
    console.log("es2017.SharedArrayBuffer.js: OK");
  } else {
    console.log("es2017.SharedArrayBuffer.js: FAIL");
  }
} catch (e) {
  console.log("es2017.SharedArrayBuffer.js: FAIL: " + e);
}