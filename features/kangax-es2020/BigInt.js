// compat-table: ES2016+ > 2020 features > BigInt (medium) > basic functionality
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
// spec: https://github.com/tc39/proposal-bigint
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (1n + 2n) === 3n;
}

try {
  if (testCode()) {
    console.log("kangax-es2020/BigInt.js: OK");
  } else {
    console.log("kangax-es2020/BigInt.js: failed");
  }
} catch (e) {
  console.log("kangax-es2020/BigInt.js: exception: " + e);
}
