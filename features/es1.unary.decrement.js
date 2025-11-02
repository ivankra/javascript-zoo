// ES1: 11.4.5 Prefix decrement operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = 5;
var b = --a;

if (a == 4 && b == 4) {
  ok++;
} else {
  console.log("es1.unary.decrement.js: prefix decrement failed");
}

var c = 10;
--c;

if (c == 9) {
  ok++;
} else {
  console.log("es1.unary.decrement.js: decrement without assignment failed");
}

if (ok == 2) {
  console.log("es1.unary.decrement.js: OK");
} else {
  console.log("es1.unary.decrement.js: FAIL");
}
