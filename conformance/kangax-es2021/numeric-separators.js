// compat-table: ES2016+ > 2021 features > numeric separators (small)
// spec: https://github.com/tc39/proposal-numeric-separator
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return 1_000_000.000_001 === 1000000.000001 &&
    0b1010_0001_1000_0101 === 0b1010000110000101;
}

try {
  if (testCode()) {
    console.log("kangax-es2021/numeric-separators.js: OK");
  } else {
    console.log("kangax-es2021/numeric-separators.js: failed");
  }
} catch (e) {
  console.log("kangax-es2021/numeric-separators.js: exception: " + e);
}
