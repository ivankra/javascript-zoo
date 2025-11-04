// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-tail-position-calls
// compat-table: ES6 > optimisation > proper tail calls (tail call optimisation) (medium) > direct recursion
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  "use strict";
  return (function f(n){
    if (n <= 0) {
      return  "foo";
    }
    return f(n - 1);
  }(1e6)) === "foo";
}

try {
  if (testCode()) {
    console.log("es6.tail-calls.direct.js: OK");
  } else {
    console.log("es6.tail-calls.direct.js: FAIL");
  }
} catch (e) {
  console.log("es6.tail-calls.direct.js: FAIL: " + e);
}