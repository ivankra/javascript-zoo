// compat-table: ES6 > optimisation > proper tail calls (tail call optimisation) (medium) > mutual recursion
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-tail-position-calls
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  "use strict";
  function f(n){
    if (n <= 0) {
      return  "foo";
    }
    return g(n - 1);
  }
  function g(n){
    if (n <= 0) {
      return  "bar";
    }
    return f(n - 1);
  }
  return f(1e6) === "foo" && f(1e6+1) === "bar";
}

try {
  if (testCode()) {
    console.log("kangax-es6/tail-calls.mutual.js: OK");
  } else {
    console.log("kangax-es6/tail-calls.mutual.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/tail-calls.mutual.js: exception: " + e);
}
