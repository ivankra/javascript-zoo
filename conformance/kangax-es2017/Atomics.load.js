// compat-table: ES2016+ > 2017 features > shared memory and atomics (medium) > Atomics.load
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/load
// spec: https://tc39.github.io/ecma262/#sec-atomics.load
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Atomics.load === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es2017/Atomics.load.js: OK");
  } else {
    console.log("kangax-es2017/Atomics.load.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/Atomics.load.js: exception: " + e);
}
