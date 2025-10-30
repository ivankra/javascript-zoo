// Standard: ES1 11.4.2 The void operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function f(x) {
  if (x == 42) {
    var y = void(f(50));
    if (y == null) {  // test that it's null/undefined
      console.log("es1.void.js: OK");
    } else {
      console.log("es1.void.js: void(...) is not nullish");
    }
  }
  return x;
};

var a = 42;
var b = void f(a);
// b should be undefined, but proper test would rely on typeof
