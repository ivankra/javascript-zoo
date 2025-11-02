// ES1: 15.7.4.2 Number.prototype.toString(radix)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var n1 = new Number(123);
if (n1.toString() == "123") {
  ok++;
} else {
  console.log("es1.Number.prototype.toString.js: toString() failed");
}

var n2 = new Number(15);
if (n2.toString(10) == "15") {
  ok++;
} else {
  console.log("es1.Number.prototype.toString.js: toString(10) failed");
}

// Note: radix other than 10 is implementation dependent in ES1

if (ok == 2) {
  console.log("es1.Number.prototype.toString.js: OK");
} else {
  console.log("es1.Number.prototype.toString.js: FAIL");
}
