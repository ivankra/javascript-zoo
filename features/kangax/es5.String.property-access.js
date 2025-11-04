// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Character_access
// compat-table: ES5 > String properties and methods (small) > Property access on strings
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return "foobar"[3] === "b";
}

try {
  if (testCode()) {
    console.log("es5.String.property-access.js: OK");
  } else {
    console.log("es5.String.property-access.js: FAIL");
  }
} catch (e) {
  console.log("es5.String.property-access.js: FAIL: " + e);
}