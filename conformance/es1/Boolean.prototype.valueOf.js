// ES1: 15.6.4.3 Boolean.prototype.valueOf()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var b1 = new Boolean(true);
if (b1.valueOf() == true) {
  ok++;
} else {
  console.log("es1/Boolean.prototype.valueOf.js: valueOf(true) failed");
}

var b2 = new Boolean(false);
if (b2.valueOf() == false) {
  ok++;
} else {
  console.log("es1/Boolean.prototype.valueOf.js: valueOf(false) failed");
}

if (ok == 2) {
  console.log("es1/Boolean.prototype.valueOf.js: OK");
} else {
  console.log("es1/Boolean.prototype.valueOf.js: failed");
}
