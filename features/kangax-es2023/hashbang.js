#!/usr/bin/env node
// compat-table: ES2016+ > 2023 features > Hashbang Grammar (tiny)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Hashbang_comments
// spec: https://github.com/tc39/proposal-hashbang/
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return !eval('#!/wash/your/hands');
}

try {
  if (testCode()) {
    console.log("kangax-es2023/hashbang.js: OK");
  } else {
    console.log("kangax-es2023/hashbang.js: failed");
  }
} catch (e) {
  console.log("kangax-es2023/hashbang.js: exception: " + e);
}
