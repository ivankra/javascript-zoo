// ES6: https://github.com/tc39/proposal-regexp-unicode-property-escapes
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
// compat-table: ES2016+ > 2018 features > RegExp Unicode Property Escapes (small) > Unicode 15.1
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /\p{Unified_Ideograph}/u.test("\u{2ebf0}");
}

try {
  if (testCode()) {
    console.log("es2018.regex.unicode-property-escapes.unicode-15.1.js: OK");
  } else {
    console.log("es2018.regex.unicode-property-escapes.unicode-15.1.js: FAIL");
  }
} catch (e) {
  console.log("es2018.regex.unicode-property-escapes.unicode-15.1.js: FAIL: " + e);
}