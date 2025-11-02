// ES1: 11.13 Assignment operators
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var i = 4;
i <<= 2;
if (i == 16) {
  ok++;
} else {
  console.log("es1.assignment.bitwise.js: <<= failed");
}

i >>= 3;
if (i == 2) {
  ok++;
} else {
  console.log("es1.assignment.bitwise.js: >>= failed");
}

i = 12;
i &= 10;
if (i == 8) {
  ok++;
} else {
  console.log("es1.assignment.bitwise.js: &= failed");
}

i ^= 3;
if (i == 11) {
  ok++;
} else {
  console.log("es1.assignment.bitwise.js: ^= failed");
}

i |= 4;
if (i == 15) {
  ok++;
} else {
  console.log("es1.assignment.bitwise.js: |= failed");
}

if (ok == 5) {
  console.log("es1.assignment.bitwise.js: OK");
} else {
  console.log("es1.assignment.bitwise.js: FAIL");
}
