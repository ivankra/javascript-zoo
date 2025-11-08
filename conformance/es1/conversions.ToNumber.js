// ES1: 9.3 ToNumber
//
// ES1: 11.6.2 The subtraction operator ( - )
// Calls ToNumber on both operands
//
// ES1: 15.7.1.1 Number(value)
// Calls ToNumber(value) and returns a Number value.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var x = true - 0;
if (x == 1) {
  ok++;
} else {
  console.log("es1/conversions.ToNumber.js: true failed");
}

x = Number(false);
if (x == 0) {
  ok++;
} else {
  console.log("es1/conversions.ToNumber.js: false failed");
}

x = null - 0;
if (x == 0) {
  ok++;
} else {
  console.log("es1/conversions.ToNumber.js: null failed");
}

x = Number("123");
if (x == 123) {
  ok++;
} else {
  console.log("es1/conversions.ToNumber.js: '123' failed");
}

x = "" - 0;
if (x == 0) {
  ok++;
} else {
  console.log("es1/conversions.ToNumber.js: '' failed");
}

x = Number(" 456 ");
if (x == 456) {
  ok++;
} else {
  console.log("es1/conversions.ToNumber.js: ' 456 ' failed");
}

x = "0xff" - 0;
if (x == 255) {
  ok++;
} else {
  console.log("es1/conversions.ToNumber.js: '0xff' failed");
}

x = Number("+789");
if (x == 789) {
  ok++;
} else {
  console.log("es1/conversions.ToNumber.js: '+789' failed");
}

x = "-10" - 0;
if (x == -10) {
  ok++;
} else {
  console.log("es1/conversions.ToNumber.js: '-10' failed");
}

x = Number("3.14");
if (x == 3.14) {
  ok++;
} else {
  console.log("es1/conversions.ToNumber.js: '3.14' failed");
}

x = "abc" - 0;
var isNaN = x != x;
if (isNaN) {
  ok++;
} else {
  console.log("es1/conversions.ToNumber.js: 'abc' failed");
}

if (ok == 11) {
  console.log("es1/conversions.ToNumber.js: OK");
} else {
  console.log("es1/conversions.ToNumber.js: failed");
}
