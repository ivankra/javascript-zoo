// ES1: 15.3.4.1 Function.prototype.constructor
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (Function.prototype.constructor == Function) {
  ok++;
} else {
  console.log("es1/Function.prototype.constructor.js: Function.prototype.constructor failed");
}

function f() {}
if (f.constructor == Function) {
  ok++;
} else {
  console.log("es1/Function.prototype.constructor.js: function instance constructor failed");
}

if (ok == 2) {
  console.log("es1/Function.prototype.constructor.js: OK");
} else {
  console.log("es1/Function.prototype.constructor.js: failed");
}
