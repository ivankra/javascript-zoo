// compat-table: ES Intl > Intl object > exists on global
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
// spec: http://www.ecma-international.org/ecma-402/1.0/#sec-8
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Intl === 'object';
}

try {
  if (testCode()) {
    console.log("kangax-intl/Intl.js: OK");
  } else {
    console.log("kangax-intl/Intl.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/Intl.js: exception: " + e);
}
