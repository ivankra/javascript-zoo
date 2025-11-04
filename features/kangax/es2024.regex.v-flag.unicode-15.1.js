// ES6: https://github.com/tc39/proposal-regexp-v-flag
// compat-table: ES2016+ > 2024 features > RegExp `v` flag (small) > Unicode 15.1
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /^\p{RGI_Emoji}$/v.test("🐦‍🔥");
}

try {
  if (testCode()) {
    console.log("es2024.regex.v-flag.unicode-15.1.js: OK");
  } else {
    console.log("es2024.regex.v-flag.unicode-15.1.js: FAIL");
  }
} catch (e) {
  console.log("es2024.regex.v-flag.unicode-15.1.js: FAIL: " + e);
}