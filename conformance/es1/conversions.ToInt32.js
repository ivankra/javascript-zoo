// ES1: 9.5 ToInt32: (signed 32 bit integer)
//
// ES1: 11.10 Binary Bitwise Operators
// Calls ToInt32 on both operands
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var x = 2.9 | 0;
if (x == 2) {
  ok++;
} else {
  console.log("es1/conversions.ToInt32.js: 2.9 failed");
}

x = -0 | 0;
if (x == 0) {
  ok++;
} else {
  console.log("es1/conversions.ToInt32.js: -0 failed");
}

x = (0 / 0) | 0;
if (x == 0) {
  ok++;
} else {
  console.log("es1/conversions.ToInt32.js: NaN failed");
}

x = (1 / 0) | 0;
if (x == 0) {
  ok++;
} else {
  console.log("es1/conversions.ToInt32.js: +Infinity failed");
}

x = (-1 / 0) | 0;
if (x == 0) {
  ok++;
} else {
  console.log("es1/conversions.ToInt32.js: -Infinity failed");
}

x = 4294967295 | 0;
if (x == -1) {
  ok++;
} else {
  console.log("es1/conversions.ToInt32.js: 2^32-1 failed");
}

x = 4294967296 | 0;
if (x == 0) {
  ok++;
} else {
  console.log("es1/conversions.ToInt32.js: 2^32 failed");
}

x = 2147483647 | 0;
if (x == 2147483647) {
  ok++;
} else {
  console.log("es1/conversions.ToInt32.js: 2^31-1 failed");
}

x = 2147483648 | 0;
if (x == -2147483648) {
  ok++;
} else {
  console.log("es1/conversions.ToInt32.js: 2^31 failed");
}

x = -2147483648 | 0;
if (x == -2147483648) {
  ok++;
} else {
  console.log("es1/conversions.ToInt32.js: -2^31 failed");
}

x = -2147483649 | 0;
if (x == 2147483647) {
  ok++;
} else {
  console.log("es1/conversions.ToInt32.js: -2^31-1 failed");
}

if (ok == 11) {
  console.log("es1/conversions.ToInt32.js: OK");
} else {
  console.log("es1/conversions.ToInt32.js: failed");
}
