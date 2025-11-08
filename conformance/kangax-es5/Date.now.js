// compat-table: ES5 > Date methods (small) > Date.now
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Date.now === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/Date.now.js: OK");
  } else {
    console.log("kangax-es5/Date.now.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Date.now.js: exception: " + e);
}
