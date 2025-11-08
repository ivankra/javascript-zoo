// compat-table: ES5 > Object/array literal extensions (large) > Trailing commas in array literals
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return [1,].length === 1;
}

try {
  if (testCode()) {
    console.log("kangax-es5/literals.trailing-comma-array.js: OK");
  } else {
    console.log("kangax-es5/literals.trailing-comma-array.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/literals.trailing-comma-array.js: exception: " + e);
}
