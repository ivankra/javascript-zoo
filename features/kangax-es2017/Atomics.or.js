// compat-table: ES2016+ > 2017 features > shared memory and atomics (medium) > Atomics.or
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/or
// spec: https://tc39.github.io/ecma262/#sec-atomics.or
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Atomics.or === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es2017/Atomics.or.js: OK");
  } else {
    console.log("kangax-es2017/Atomics.or.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/Atomics.or.js: exception: " + e);
}
