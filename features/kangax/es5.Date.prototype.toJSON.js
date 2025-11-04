// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON
// compat-table: ES5 > Date methods (small) > Date.prototype.toJSON
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    return Date.prototype.toJSON.call(new Date(NaN)) === null;
  } catch (e) {
    return false;
  }
}

try {
  if (testCode()) {
    console.log("es5.Date.prototype.toJSON.js: OK");
  } else {
    console.log("es5.Date.prototype.toJSON.js: FAIL");
  }
} catch (e) {
  console.log("es5.Date.prototype.toJSON.js: FAIL: " + e);
}