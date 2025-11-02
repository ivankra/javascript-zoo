// ES1: 7.7.3 Numeric Literals
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

// DecimalIntegerLiteral . DecimalDigits
if (3.14 == 3.14) {
  ok++;
} else {
  console.log("es1.literals.decimal.js: 3.14 failed");
}

// . DecimalDigits
if (.5 == 0.5) {
  ok++;
} else {
  console.log("es1.literals.decimal.js: .5 failed");
}

// DecimalIntegerLiteral ExponentPart
if (1e3 == 1000) {
  ok++;
} else {
  console.log("es1.literals.decimal.js: 1e3 failed");
}

// Negative exponent
if (1e-3 == 0.001) {
  ok++;
} else {
  console.log("es1.literals.decimal.js: 1e-3 failed");
}

// Uppercase E
if (2E2 == 200) {
  ok++;
} else {
  console.log("es1.literals.decimal.js: 2E2 failed");
}

// DecimalIntegerLiteral . DecimalDigits ExponentPart
if (1.5e2 == 150) {
  ok++;
} else {
  console.log("es1.literals.decimal.js: 1.5e2 failed");
}

if (ok == 6) {
  console.log("es1.literals.decimal.js: OK");
} else {
  console.log("es1.literals.decimal.js: FAIL");
}
