// ES1: 11.4.4 Prefix increment operator
// ES1: 11.4.5 Prefix decrement operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = 5;
var b = ++a;
if (a == 6 && b == 6) {
  ok++;
} else {
  console.log("es1.prefix.js: prefix increment failed");
}

var c = 10;
var d = --c;
if (c == 9 && d == 9) {
  ok++;
} else {
  console.log("es1.prefix.js: prefix decrement failed");
}

var e = 0;
var f = ++e;
if (e == 1 && f == 1) {
  ok++;
} else {
  console.log("es1.prefix.js: prefix increment from zero failed");
}

var g = 0;
var h = --g;
if (g == -1 && h == -1) {
  ok++;
} else {
  console.log("es1.prefix.js: prefix decrement to negative failed");
}

if (ok == 4) {
  console.log("es1.prefix.js: OK");
} else {
  console.log("es1.prefix.js: FAIL");
}
