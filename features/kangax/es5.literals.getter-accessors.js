// compat-table: ES5 > Object/array literal extensions (large) > Getter accessors
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return ({ get x(){ return 1 } }).x === 1;
}

try {
  if (testCode()) {
    console.log("es5.literals.getter-accessors.js: OK");
  } else {
    console.log("es5.literals.getter-accessors.js: FAIL");
  }
} catch (e) {
  console.log("es5.literals.getter-accessors.js: FAIL: " + e);
}