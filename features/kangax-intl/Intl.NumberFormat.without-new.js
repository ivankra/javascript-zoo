// compat-table: ES Intl > NumberFormat > constructor called without new creates instances
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
// spec: http://www.ecma-international.org/ecma-402/1.0/#sec-10.1.2.1
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Intl.NumberFormat() instanceof Intl.NumberFormat;
}

try {
  if (testCode()) {
    console.log("kangax-intl/Intl.NumberFormat.without-new.js: OK");
  } else {
    console.log("kangax-intl/Intl.NumberFormat.without-new.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/Intl.NumberFormat.without-new.js: exception: " + e);
}
