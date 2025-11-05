// compat-table: ES5 > JSON (medium)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof JSON === 'object';
}

try {
  if (testCode()) {
    console.log("kangax-es5/JSON.js: OK");
  } else {
    console.log("kangax-es5/JSON.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/JSON.js: exception: " + e);
}
