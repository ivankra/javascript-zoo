// ES6: https://github.com/tc39/proposal-object-rest-spread
// compat-table: ES2016+ > 2018 features > object rest/spread properties (medium) > object spread properties
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var spread = { b: 2, c: 3 };
  var O = { a: 1, ...spread };
  return O !== spread && (O.a + O.b + O.c) === 6;
}

try {
  if (testCode()) {
    console.log("es2018.object-spread.js: OK");
  } else {
    console.log("es2018.object-spread.js: FAIL");
  }
} catch (e) {
  console.log("es2018.object-spread.js: FAIL: " + e);
}