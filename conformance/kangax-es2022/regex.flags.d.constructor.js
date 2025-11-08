// compat-table: ES2016+ > 2022 features > RegExp Match Indices (`hasIndices` / `d` flag) (small) > constructor supports it
// spec: https://github.com/tc39/proposal-regexp-match-indices
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return new RegExp('a', 'd') instanceof RegExp;
}

try {
  if (testCode()) {
    console.log("kangax-es2022/regex.flags.d.constructor.js: OK");
  } else {
    console.log("kangax-es2022/regex.flags.d.constructor.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/regex.flags.d.constructor.js: exception: " + e);
}
