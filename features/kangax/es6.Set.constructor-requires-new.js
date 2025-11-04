// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// compat-table: ES6 > built-ins > Set (medium) > constructor requires new
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  new Set();
  try {
    Set();
    return false;
  } catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("es6.Set.constructor-requires-new.js: OK");
  } else {
    console.log("es6.Set.constructor-requires-new.js: FAIL");
  }
} catch (e) {
  console.log("es6.Set.constructor-requires-new.js: FAIL: " + e);
}