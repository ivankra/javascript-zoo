// ES6: https://github.com/tc39/proposal-regexp-v-flag
// compat-table: ES2016+ > 2024 features > RegExp `v` flag (small) > constructor supports it
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return new RegExp('a', 'v') instanceof RegExp;
}

try {
  if (testCode()) {
    console.log("es2024.regex.v-flag.constructor.js: OK");
  } else {
    console.log("es2024.regex.v-flag.constructor.js: FAIL");
  }
} catch (e) {
  console.log("es2024.regex.v-flag.constructor.js: FAIL: " + e);
}