// ES1: 15.2.4.1 Object.prototype.constructor
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (Object.prototype.constructor == Object) {
  ok++;
} else {
  console.log("es1.Object.prototype.constructor.js: Object.prototype.constructor failed");
}

var o = new Object();
if (o.constructor == Object) {
  ok++;
} else {
  console.log("es1.Object.prototype.constructor.js: object instance constructor failed");
}

if (ok == 2) {
  console.log("es1.Object.prototype.constructor.js: OK");
} else {
  console.log("es1.Object.prototype.constructor.js: FAIL");
}
