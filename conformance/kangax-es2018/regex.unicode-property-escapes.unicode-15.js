// compat-table: ES2016+ > 2018 features > RegExp Unicode Property Escapes (small) > Unicode 15
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
// spec: https://github.com/tc39/proposal-regexp-unicode-property-escapes
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /\p{Script=Kawi}/u.test("\u{11f00}") && /\p{Emoji}/u.test("🫨");
}

try {
  if (testCode()) {
    console.log("kangax-es2018/regex.unicode-property-escapes.unicode-15.js: OK");
  } else {
    console.log("kangax-es2018/regex.unicode-property-escapes.unicode-15.js: failed");
  }
} catch (e) {
  console.log("kangax-es2018/regex.unicode-property-escapes.unicode-15.js: exception: " + e);
}
