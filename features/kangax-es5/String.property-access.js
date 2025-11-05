// compat-table: ES5 > String properties and methods (small) > Property access on strings
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Character_access
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return "foobar"[3] === "b";
}

try {
  if (testCode()) {
    console.log("kangax-es5/String.property-access.js: OK");
  } else {
    console.log("kangax-es5/String.property-access.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/String.property-access.js: exception: " + e);
}
