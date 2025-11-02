// ES1: 15.4.4.1 Array.prototype.constructor
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (Array.prototype.constructor == Array) {
  ok++;
} else {
  console.log("es1.Array.prototype.constructor.js: Array.prototype.constructor failed");
}

var a = new Array();
if (a.constructor == Array) {
  ok++;
} else {
  console.log("es1.Array.prototype.constructor.js: array instance constructor failed");
}

if (ok == 2) {
  console.log("es1.Array.prototype.constructor.js: OK");
} else {
  console.log("es1.Array.prototype.constructor.js: FAIL");
}
