// ES1: 15.7.4.1 Number.prototype.constructor
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (Number.prototype.constructor == Number) {
  ok++;
} else {
  console.log("es1.Number.prototype.constructor.js: Number.prototype.constructor failed");
}

var n = new Number(123);
if (n.constructor == Number) {
  ok++;
} else {
  console.log("es1.Number.prototype.constructor.js: number instance constructor failed");
}

if (ok == 2) {
  console.log("es1.Number.prototype.constructor.js: OK");
} else {
  console.log("es1.Number.prototype.constructor.js: FAIL");
}
