// ES1: 11.7.1 The left shift operator ( << )
// ES1: 11.7.2 The signed right shift operator ( >> )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = -12345;
var b = a >> 2;
if (b == -3087) {
  ok++;
} else {
  console.log("es1.bitwise.shifts.js: -12345 >> 2 != -3087");
}

var c = a << 2;
if (c == -49380) {
  ok++;
} else {
  console.log("es1.bitwise.shifts.js: -12345 << 2 != -49380");
}

if (ok == 2) {
  console.log("es1.bitwise.shifts.js: OK");
} else {
  console.log("es1.bitwise.shifts.js: FAIL");
}
