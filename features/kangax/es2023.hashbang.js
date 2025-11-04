// ES6: https://github.com/tc39/proposal-hashbang/
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Hashbang_comments
// compat-table: ES2016+ > 2023 features > Hashbang Grammar (tiny)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    return !eval('#!/wash/your/hands');
  } catch (e) {
    return false
  }
}

try {
  if (testCode()) {
    console.log("es2023.hashbang.js: OK");
  } else {
    console.log("es2023.hashbang.js: FAIL");
  }
} catch (e) {
  console.log("es2023.hashbang.js: FAIL: " + e);
}