// compat-table: ES5 > Object/array literal extensions (large) > Setter accessors
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var value = 0;
  ({ set x(v){ value = v; } }).x = 1;
  return value === 1;
}

try {
  if (testCode()) {
    console.log("es5.literals.setter-accessors.js: OK");
  } else {
    console.log("es5.literals.setter-accessors.js: FAIL");
  }
} catch (e) {
  console.log("es5.literals.setter-accessors.js: FAIL: " + e);
}