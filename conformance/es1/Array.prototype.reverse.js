// ES1: 15.4.4.4 Array.prototype.reverse()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = new Array(1, 2, 3);
var r1 = a1.reverse();
if (r1 == a1) {
  ok++;
} else {
  console.log("es1/Array.prototype.reverse.js: reverse returns this failed");
}

if (a1[0] == 3 && a1[1] == 2 && a1[2] == 1) {
  ok++;
} else {
  console.log("es1/Array.prototype.reverse.js: reverse order failed");
}

var a2 = new Array("a", "b", "c", "d");
a2.reverse();
if (a2[0] == "d" && a2[1] == "c" && a2[2] == "b" && a2[3] == "a") {
  ok++;
} else {
  console.log("es1/Array.prototype.reverse.js: reverse even length failed");
}

var a3 = new Array();
a3[0] = 5;
a3.reverse();
if (a3[0] == 5 && a3.length == 1) {
  ok++;
} else {
  console.log("es1/Array.prototype.reverse.js: reverse single element failed");
}

var a4 = new Array();
a4.reverse();
if (a4.length == 0) {
  ok++;
} else {
  console.log("es1/Array.prototype.reverse.js: reverse empty array failed");
}

if (ok == 5) {
  console.log("es1/Array.prototype.reverse.js: OK");
} else {
  console.log("es1/Array.prototype.reverse.js: failed");
}
