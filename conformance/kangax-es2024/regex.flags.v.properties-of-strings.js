// compat-table: ES2016+ > 2024 features > RegExp `v` flag (small) > properties of Strings
// spec: https://github.com/tc39/proposal-regexp-v-flag
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
    console.log("kangax-es2024/regex.flags.v.properties-of-strings.js: OK");
  } else {
    console.log("kangax-es2024/regex.flags.v.properties-of-strings.js: failed");
  }
} catch (e) {
  console.log("kangax-es2024/regex.flags.v.properties-of-strings.js: exception: " + e);
}
