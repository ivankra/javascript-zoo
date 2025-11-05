// compat-table: ES Intl > Intl object > has prototype of Object
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
// spec: http://www.ecma-international.org/ecma-402/1.0/#sec-8
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Intl.constructor === Object;
}

try {
  if (testCode()) {
    console.log("kangax-intl/Intl.prototype.js: OK");
  } else {
    console.log("kangax-intl/Intl.prototype.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/Intl.prototype.js: exception: " + e);
}
