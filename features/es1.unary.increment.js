// ES1: 11.4.4 Prefix increment operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = 5;
var b = ++a;

if (a == 6 && b == 6) {
  ok++;
} else {
  console.log("es1.unary.increment.js: prefix increment failed");
}

var c = 10;
++c;

if (c == 11) {
  ok++;
} else {
  console.log("es1.unary.increment.js: increment without assignment failed");
}

if (ok == 2) {
  console.log("es1.unary.increment.js: OK");
} else {
  console.log("es1.unary.increment.js: FAIL");
}
