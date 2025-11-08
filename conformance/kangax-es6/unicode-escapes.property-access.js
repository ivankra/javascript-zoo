// compat-table: ES6 > syntax > Unicode code point escapes (small) > in property key accesses
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-literals-string-literals
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var o = { '\ud800\udec0' : 2 };
  return o.\u{102C0} === 2;
}

try {
  if (testCode()) {
    console.log("kangax-es6/unicode-escapes.property-access.js: OK");
  } else {
    console.log("kangax-es6/unicode-escapes.property-access.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/unicode-escapes.property-access.js: exception: " + e);
}
