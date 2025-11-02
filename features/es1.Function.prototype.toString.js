// ES1: 15.3.4.2 Function.prototype.toString()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

function f1() {
  return 1;
}
var s1 = f1.toString();
if (typeof s1 == "string") {
  ok++;
} else {
  console.log("es1.Function.prototype.toString.js: toString type failed");
}

var f2 = new Function("return 42;");
var s2 = f2.toString();
if (typeof s2 == "string") {
  ok++;
} else {
  console.log("es1.Function.prototype.toString.js: Function toString failed");
}

if (ok == 2) {
  console.log("es1.Function.prototype.toString.js: OK");
} else {
  console.log("es1.Function.prototype.toString.js: FAIL");
}
