// ES6: https://github.com/tc39/proposal-bigint
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
// compat-table: ES2016+ > 2020 features > BigInt (medium) > BigInt.asUintN
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof BigInt.asUintN === 'function';
}

try {
  if (testCode()) {
    console.log("es2020.BigInt.asUintN.js: OK");
  } else {
    console.log("es2020.BigInt.asUintN.js: FAIL");
  }
} catch (e) {
  console.log("es2020.BigInt.asUintN.js: FAIL: " + e);
}