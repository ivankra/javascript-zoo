// compat-table: ES2016+ > 2020 features > BigInt (medium) > BigInt.asUintN
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
// spec: https://github.com/tc39/proposal-bigint
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof BigInt.asUintN === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es2020/BigInt.asUintN.js: OK");
  } else {
    console.log("kangax-es2020/BigInt.asUintN.js: failed");
  }
} catch (e) {
  console.log("kangax-es2020/BigInt.asUintN.js: exception: " + e);
}
