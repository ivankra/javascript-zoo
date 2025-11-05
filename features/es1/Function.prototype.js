// ES1: 15.3.5 Properties of Function Instances
// ES1: 15.3.5.2 prototype
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

function F() {
  this.x = 1;
}
F.prototype.y = 2;

var obj = new F();
if (obj.x == 1) {
  ok++;
} else {
  console.log("es1/Function.prototype.js: constructor property failed");
}

if (obj.y == 2) {
  ok++;
} else {
  console.log("es1/Function.prototype.js: prototype property failed");
}

if (ok == 2) {
  console.log("es1/Function.prototype.js: OK");
} else {
  console.log("es1/Function.prototype.js: failed");
}
