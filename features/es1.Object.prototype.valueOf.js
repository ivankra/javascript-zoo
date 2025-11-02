// ES1: 15.2.4.3 Object.prototype.valueOf()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var o = new Object();
var v = o.valueOf();
if (v == o) {
  ok++;
} else {
  console.log("es1.Object.prototype.valueOf.js: valueOf failed");
}

var o2 = new Object();
o2.a = 1;
var v2 = o2.valueOf();
if (v2.a == 1) {
  ok++;
} else {
  console.log("es1.Object.prototype.valueOf.js: valueOf property access failed");
}

if (ok == 2) {
  console.log("es1.Object.prototype.valueOf.js: OK");
} else {
  console.log("es1.Object.prototype.valueOf.js: FAIL");
}
