// ES1: 12.2 Variable statement
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a;
a = 1;
if (a == 1) {
  ok++;
} else {
  console.log("es1.var.js: var a with later assignment failed");
}

var b = 10;
if (b == 10) {
  ok++;
} else {
  console.log("es1.var.js: var with initializer failed");
}

var f = 1, g = 2, h = 3;
if (f == 1 && g == 2 && h == 3) {
  ok++;
} else {
  console.log("es1.var.js: multiple initialized vars failed");
}

var i = 5, j, k = 10;
if (i == 5 && k == 10) {
  ok++;
} else {
  console.log("es1.var.js: mixed initialized/uninitialized vars failed");
}

var m = 2 + 3;
if (m == 5) {
  ok++;
} else {
  console.log("es1.var.js: var with expression initializer failed");
}

var n = 100;
var n = 200;
if (n == 200) {
  ok++;
} else {
  console.log("es1.var.js: var redeclaration failed");
}

var p = 10;
p = 20;
if (p == 20) {
  ok++;
} else {
  console.log("es1.var.js: var reassignment failed");
}

var q = "test", r = "string";
if (q == "test" && r == "string") {
  ok++;
} else {
  console.log("es1.var.js: string var initialization failed");
}

var s = 1 + 2, t = 3 + 4;
if (s == 3 && t == 7) {
  ok++;
} else {
  console.log("es1.var.js: expression initialization failed");
}

if (ok == 9) {
  console.log("es1.var.js: OK");
} else {
  console.log("es1.var.js: FAIL");
}
