// ES1: 11.13.2 Compound assignment ( op= )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var x = 1;
var y = 220;

function f() {
  x = 660;
  y = 2;
  return 4;
}

// ECMAScript prescribes a well-defined strict left-to-right evaluation order,
// which can be counterintuitive and different from C++ in some cases.
x += f() + y;

if (x == 7 && y == 2) {
  console.log("es1.assignment.ltr.js: OK");
} else if (x == 666) {
  console.log("es1.assignment.ltr.js: FAIL: C++ like evaluation order in 'x += y'");
} else {
  console.log("es1.assignment.ltr.js: FAIL x=" + x);
}
