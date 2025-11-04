// ES6: https://tc39.github.io/ecma262/#sec-atomics.xor
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/xor
// compat-table: ES2016+ > 2017 features > shared memory and atomics (medium) > Atomics.xor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Atomics.xor === 'function';
}

try {
  if (testCode()) {
    console.log("es2017.Atomics.xor.js: OK");
  } else {
    console.log("es2017.Atomics.xor.js: FAIL");
  }
} catch (e) {
  console.log("es2017.Atomics.xor.js: FAIL: " + e);
}