// ES1: 11.4.2 The void operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function f(x, y, z) {
  // check for undefined here using nullish comparison, without relying on typeof
  if (x == 42 && y == null && z == 42) {
    console.log("es1.void.js: OK");
  } else {
    console.log("es1.void.js: void(...) is not nullish");
  }
  return x;
};

var a = 42;
var b = void(a);  // => undefined
var c = void f(a, b, a);
