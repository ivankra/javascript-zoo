// ES6: https://github.com/tc39/proposal-regexp-unicode-property-escapes
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
// compat-table: ES2016+ > 2018 features > RegExp Unicode Property Escapes (small) > basic
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const regexGreekSymbol = /\p{Script=Greek}/u;
  return regexGreekSymbol.test('π');
}

try {
  if (testCode()) {
    console.log("es2018.regex.unicode-property-escapes.js: OK");
  } else {
    console.log("es2018.regex.unicode-property-escapes.js: FAIL");
  }
} catch (e) {
  console.log("es2018.regex.unicode-property-escapes.js: FAIL: " + e);
}