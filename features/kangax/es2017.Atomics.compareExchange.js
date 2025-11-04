// ES6: https://tc39.github.io/ecma262/#sec-atomics.compareExchange
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/compareExchange
// compat-table: ES2016+ > 2017 features > shared memory and atomics (medium) > Atomics.compareExchange
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Atomics.compareExchange === 'function';
}

try {
  if (testCode()) {
    console.log("es2017.Atomics.compareExchange.js: OK");
  } else {
    console.log("es2017.Atomics.compareExchange.js: FAIL");
  }
} catch (e) {
  console.log("es2017.Atomics.compareExchange.js: FAIL: " + e);
}