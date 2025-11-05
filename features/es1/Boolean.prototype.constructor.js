// ES1: 15.6.4.1 Boolean.prototype.constructor
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (Boolean.prototype.constructor == Boolean) {
  ok++;
} else {
  console.log("es1/Boolean.prototype.constructor.js: Boolean.prototype.constructor failed");
}

var b = new Boolean(true);
if (b.constructor == Boolean) {
  ok++;
} else {
  console.log("es1/Boolean.prototype.constructor.js: boolean instance constructor failed");
}

if (ok == 2) {
  console.log("es1/Boolean.prototype.constructor.js: OK");
} else {
  console.log("es1/Boolean.prototype.constructor.js: failed");
}
