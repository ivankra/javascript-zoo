// compat-table: ES Intl > DateTimeFormat > exists on intl object
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
// spec: http://www.ecma-international.org/ecma-402/1.0/#sec-12
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Intl.DateTimeFormat === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-intl/Intl.DateTimeFormat.js: OK");
  } else {
    console.log("kangax-intl/Intl.DateTimeFormat.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/Intl.DateTimeFormat.js: exception: " + e);
}
