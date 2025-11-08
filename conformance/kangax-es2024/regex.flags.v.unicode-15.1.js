// compat-table: ES2016+ > 2024 features > RegExp `v` flag (small) > Unicode 15.1
// spec: https://github.com/tc39/proposal-regexp-v-flag
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /^\p{RGI_Emoji}$/v.test("🐦‍🔥");
}

try {
  if (testCode()) {
    console.log("kangax-es2024/regex.flags.v.unicode-15.1.js: OK");
  } else {
    console.log("kangax-es2024/regex.flags.v.unicode-15.1.js: failed");
  }
} catch (e) {
  console.log("kangax-es2024/regex.flags.v.unicode-15.1.js: exception: " + e);
}
