// ES6: https://github.com/tc39/proposal-regexp-match-indices
// compat-table: ES2016+ > 2022 features > RegExp Match Indices (`hasIndices` / `d` flag) (small) > constructor supports it
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return new RegExp('a', 'd') instanceof RegExp;
}

try {
  if (testCode()) {
    console.log("es2022.regex.match-indices.constructor.js: OK");
  } else {
    console.log("es2022.regex.match-indices.constructor.js: FAIL");
  }
} catch (e) {
  console.log("es2022.regex.match-indices.constructor.js: FAIL: " + e);
}