// ES1: 11.10 Binary bitwise operators
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = 12345;
var b = 45678;

var c = a & b;
if (c == 12328) {
  ok++;
} else {
  console.log("es1/bitwise.binary.js: 12345 & 45678 != 12328");
}

var d = a | b;
if (d == 45695) {
  ok++;
} else {
  console.log("es1/bitwise.binary.js: 12345 | 45678 != 45695");
}

var e = a ^ b;
if (e == 33367) {
  ok++;
} else {
  console.log("es1/bitwise.binary.js: 12345 ^ 45678 != 33367");
}

// Idiom for integer cast
var f = 123.456;
var g = f | 0;
if (g == 123) {
  ok++;
} else {
  console.log("es1/bitwise.binary.js: 123.456 | 0 != 123");
}

if (ok == 4) {
  console.log("es1/bitwise.binary.js: OK");
} else {
  console.log("es1/bitwise.binary.js: failed");
}
