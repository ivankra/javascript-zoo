// ES6: https://github.com/tc39/proposal-regexp-v-flag
// compat-table: ES2016+ > 2024 features > RegExp `v` flag (small) > properties of Strings
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /^\p{Emoji_Keycap_Sequence}$/v.test("*\uFE0F\u20E3")
  && !/^\p{Emoji_Keycap_Sequence}$/v.test("*");
}

try {
  if (testCode()) {
    console.log("es2024.regex.v-flag.properties-of-strings.js: OK");
  } else {
    console.log("es2024.regex.v-flag.properties-of-strings.js: FAIL");
  }
} catch (e) {
  console.log("es2024.regex.v-flag.properties-of-strings.js: FAIL: " + e);
}