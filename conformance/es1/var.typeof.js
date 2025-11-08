// ES1: 12.2 Variable statement
// ES1: 11.4.3 The typeof operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a;
if (typeof a == "undefined") {
  ok++;
} else {
  console.log("es1/var.typeof.js: uninitialized var not undefined");
}

var b = 10;
if (typeof b == "number") {
  ok++;
} else {
  console.log("es1/var.typeof.js: var with initializer failed");
}

var c, d, e;
if (typeof c == "undefined" && typeof d == "undefined" && typeof e == "undefined") {
  ok++;
} else {
  console.log("es1/var.typeof.js: multiple uninitialized vars failed");
}

var f = 1, g, h = 3;
if (typeof f == "number" && typeof g == "undefined" && typeof h == "number") {
  ok++;
} else {
  console.log("es1/var.typeof.js: mixed initialized/uninitialized vars failed");
}

var s = "test";
if (typeof s == "string") {
  ok++;
} else {
  console.log("es1/var.typeof.js: string var typeof failed");
}

if (ok == 5) {
  console.log("es1/var.typeof.js: OK");
} else {
  console.log("es1/var.typeof.js: failed");
}
