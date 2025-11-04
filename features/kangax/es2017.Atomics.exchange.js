// ES6: https://tc39.github.io/ecma262/#sec-atomics.exchange
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/exchange
// compat-table: ES2016+ > 2017 features > shared memory and atomics (medium) > Atomics.exchange
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Atomics.exchange === 'function';
}

try {
  if (testCode()) {
    console.log("es2017.Atomics.exchange.js: OK");
  } else {
    console.log("es2017.Atomics.exchange.js: FAIL");
  }
} catch (e) {
  console.log("es2017.Atomics.exchange.js: FAIL: " + e);
}