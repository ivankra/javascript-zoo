// ES1: 15.6.4.2 Boolean.prototype.toString()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var b1 = new Boolean(true);
if (b1.toString() == "true") {
  ok++;
} else {
  console.log("es1.Boolean.prototype.toString.js: toString(true) failed");
}

var b2 = new Boolean(false);
if (b2.toString() == "false") {
  ok++;
} else {
  console.log("es1.Boolean.prototype.toString.js: toString(false) failed");
}

if (ok == 2) {
  console.log("es1.Boolean.prototype.toString.js: OK");
} else {
  console.log("es1.Boolean.prototype.toString.js: FAIL");
}
