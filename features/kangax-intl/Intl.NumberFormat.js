// compat-table: ES Intl > NumberFormat > exists on intl object
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
// spec: http://www.ecma-international.org/ecma-402/1.0/#sec-11
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Intl.NumberFormat === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-intl/Intl.NumberFormat.js: OK");
  } else {
    console.log("kangax-intl/Intl.NumberFormat.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/Intl.NumberFormat.js: exception: " + e);
}
