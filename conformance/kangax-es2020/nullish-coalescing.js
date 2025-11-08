// compat-table: ES2016+ > 2020 features > nullish coalescing operator (??) (small)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
// spec: https://github.com/tc39/proposal-nullish-coalescing
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (null ?? 42) === 42 &&
    (undefined ?? 42) === 42 &&
    (false ?? 42) === false &&
    ('' ?? 42) === '' &&
    (0 ?? 42) === 0 &&
    isNaN(NaN ?? 42);
}

try {
  if (testCode()) {
    console.log("kangax-es2020/nullish-coalescing.js: OK");
  } else {
    console.log("kangax-es2020/nullish-coalescing.js: failed");
  }
} catch (e) {
  console.log("kangax-es2020/nullish-coalescing.js: exception: " + e);
}
