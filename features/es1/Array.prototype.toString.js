// ES1: 15.4.4.2 Array.prototype.toString()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = new Array(1, 2, 3);
var s1 = a1.toString();
if (s1 == "1,2,3") {
  ok++;
} else {
  console.log("es1/Array.prototype.toString.js: numeric array toString failed");
}

var a2 = new Array("a", "b", "c");
var s2 = a2.toString();
if (s2 == "a,b,c") {
  ok++;
} else {
  console.log("es1/Array.prototype.toString.js: string array toString failed");
}

var a3 = new Array();
var s3 = a3.toString();
if (s3 == "") {
  ok++;
} else {
  console.log("es1/Array.prototype.toString.js: empty array toString failed");
}

if (ok == 3) {
  console.log("es1/Array.prototype.toString.js: OK");
} else {
  console.log("es1/Array.prototype.toString.js: failed");
}
