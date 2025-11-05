// compat-table: ES2016+ > 2024 features > RegExp `v` flag (small) > constructor supports it
// spec: https://github.com/tc39/proposal-regexp-v-flag
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return new RegExp('a', 'v') instanceof RegExp;
}

try {
  if (testCode()) {
    console.log("kangax-es2024/regex.flags.v.constructor.js: OK");
  } else {
    console.log("kangax-es2024/regex.flags.v.constructor.js: failed");
  }
} catch (e) {
  console.log("kangax-es2024/regex.flags.v.constructor.js: exception: " + e);
}
