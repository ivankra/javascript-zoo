// compat-table: ES2016+ > 2018 features > RegExp Lookbehind Assertions (small)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions
// spec: https://github.com/tc39/proposal-regexp-lookbehind
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /(?<=a)b/.test('ab') && /(?<!a)b/.test('cb') &&
         !/(?<=a)b/.test('b');
}

try {
  if (testCode()) {
    console.log("kangax-es2018/regex.lookbehind.js: OK");
  } else {
    console.log("kangax-es2018/regex.lookbehind.js: failed");
  }
} catch (e) {
  console.log("kangax-es2018/regex.lookbehind.js: exception: " + e);
}
