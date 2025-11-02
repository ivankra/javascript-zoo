// ES1: 15.7.4.3 Number.prototype.valueOf()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var n1 = new Number(123);
if (n1.valueOf() == 123) {
  ok++;
} else {
  console.log("es1.Number.prototype.valueOf.js: valueOf(123) failed");
}

var n2 = new Number(0);
if (n2.valueOf() == 0) {
  ok++;
} else {
  console.log("es1.Number.prototype.valueOf.js: valueOf(0) failed");
}

if (ok == 2) {
  console.log("es1.Number.prototype.valueOf.js: OK");
} else {
  console.log("es1.Number.prototype.valueOf.js: FAIL");
}
