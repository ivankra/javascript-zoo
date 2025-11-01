// ES1: 11.4.7 Unary - operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = -10;
if (a == -10) {
  ok++;
} else {
  console.log("es1.unary.minus.js: unary - number failed");
}

var b = 5;
var c = -b;
if (c == -5) {
  ok++;
} else {
  console.log("es1.unary.minus.js: unary - variable failed");
}

if (ok == 2) {
  console.log("es1.unary.minus.js: OK");
} else {
  console.log("es1.unary.minus.js: FAIL");
}
