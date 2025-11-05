// compat-table: ES2016+ > 2024 features > RegExp `v` flag (small) > set notations
// spec: https://github.com/tc39/proposal-regexp-v-flag
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /[\p{ASCII}&&\p{Decimal_Number}]/v.test("0")
  && /[\p{Any}--[\x01-\u{10ffff}]]/v.test("\0")
}

try {
  if (testCode()) {
    console.log("kangax-es2024/regex.flags.v.set-notations.js: OK");
  } else {
    console.log("kangax-es2024/regex.flags.v.set-notations.js: failed");
  }
} catch (e) {
  console.log("kangax-es2024/regex.flags.v.set-notations.js: exception: " + e);
}
