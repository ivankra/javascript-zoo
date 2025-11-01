// ES1: 11.5.3 Applying the % operator (floating-point)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = 5.5 % 2.5;
if (r1 > 0.4 && r1 < 0.6) {
  ok++;
} else {
  console.log("es1.numbers.modf.js: 5.5 % 2.5 failed");
}

var r2 = 7.2 % 3.0;
if (r2 > 1.1 && r2 < 1.3) {
  ok++;
} else {
  console.log("es1.numbers.modf.js: 7.2 % 3.0 failed");
}

var r3 = -5.5 % 2.5;
if (r3 < -0.4 && r3 > -0.6) {
  ok++;
} else {
  console.log("es1.numbers.modf.js: -5.5 % 2.5 sign failed");
}

if (ok == 3) {
  console.log("es1.numbers.modf.js: OK");
} else {
  console.log("es1.numbers.modf.js: FAIL");
}
