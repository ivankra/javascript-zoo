// compat-table: ES5 > Miscellaneous (medium) > parseInt ignores leading zeros
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return parseInt('010') === 10;
}

try {
  if (testCode()) {
    console.log("kangax-es5/misc.parseInt.ignores-leading-zeros.js: OK");
  } else {
    console.log("kangax-es5/misc.parseInt.ignores-leading-zeros.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/misc.parseInt.ignores-leading-zeros.js: exception: " + e);
}
