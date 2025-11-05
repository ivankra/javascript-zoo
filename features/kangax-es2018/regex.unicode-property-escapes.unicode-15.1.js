// compat-table: ES2016+ > 2018 features > RegExp Unicode Property Escapes (small) > Unicode 15.1
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
// spec: https://github.com/tc39/proposal-regexp-unicode-property-escapes
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /\p{Unified_Ideograph}/u.test("\u{2ebf0}");
}

try {
  if (testCode()) {
    console.log("kangax-es2018/regex.unicode-property-escapes.unicode-15.1.js: OK");
  } else {
    console.log("kangax-es2018/regex.unicode-property-escapes.unicode-15.1.js: failed");
  }
} catch (e) {
  console.log("kangax-es2018/regex.unicode-property-escapes.unicode-15.1.js: exception: " + e);
}
