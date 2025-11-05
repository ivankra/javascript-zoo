// compat-table: ES Intl > DateTimeFormat > constructor called without new creates instances
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
// spec: http://www.ecma-international.org/ecma-402/1.0/#sec-10.1.2.1
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Intl.DateTimeFormat() instanceof Intl.DateTimeFormat;
}

try {
  if (testCode()) {
    console.log("kangax-intl/Intl.DateTimeFormat.without-new.js: OK");
  } else {
    console.log("kangax-intl/Intl.DateTimeFormat.without-new.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/Intl.DateTimeFormat.without-new.js: exception: " + e);
}
