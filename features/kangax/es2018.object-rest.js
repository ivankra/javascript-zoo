// ES6: https://github.com/tc39/proposal-object-rest-spread
// compat-table: ES2016+ > 2018 features > object rest/spread properties (medium) > object rest properties
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var { a, ...rest } = { a: 1, b: 2, c: 3 };
  return a === 1 && rest.a === void undefined && rest.b === 2 && rest.c === 3;
}

try {
  if (testCode()) {
    console.log("es2018.object-rest.js: OK");
  } else {
    console.log("es2018.object-rest.js: FAIL");
  }
} catch (e) {
  console.log("es2018.object-rest.js: FAIL: " + e);
}