// ES1: 15.5.4.1 String.prototype.constructor
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (String.prototype.constructor == String) {
  ok++;
} else {
  console.log("es1.String.prototype.constructor.js: String.prototype.constructor failed");
}

var s = new String("test");
if (s.constructor == String) {
  ok++;
} else {
  console.log("es1.String.prototype.constructor.js: string instance constructor failed");
}

if (ok == 2) {
  console.log("es1.String.prototype.constructor.js: OK");
} else {
  console.log("es1.String.prototype.constructor.js: FAIL");
}
