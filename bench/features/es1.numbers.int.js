// ES1: 11.5 Multiplicative operators
// ES1: 11.6 Additive operators
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (5 + 3 == 8) {
  ok++;
} else {
  console.log("es1.numbers.int.js: addition failed");
}

if (10 - 4 == 6) {
  ok++;
} else {
  console.log("es1.numbers.int.js: subtraction failed");
}

if (6 * 7 == 42) {
  ok++;
} else {
  console.log("es1.numbers.int.js: multiplication failed");
}

if (20 / 4 == 5) {
  ok++;
} else {
  console.log("es1.numbers.int.js: division failed");
}

if (17 % 5 == 2) {
  ok++;
} else {
  console.log("es1.numbers.int.js: modulo failed");
}

if (ok == 5) {
  console.log("es1.numbers.int.js: OK");
} else {
  console.log("es1.numbers.int.js: FAIL");
}
