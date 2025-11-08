// ES1: 15.5.4.8 String.prototype.split(separator)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "a,b,c";
var a1 = s1.split(",");
if (a1.length == 3 && a1[0] == "a" && a1[1] == "b" && a1[2] == "c") {
  ok++;
} else {
  console.log("es1/String.prototype.split.js: split(',') failed");
}

var s2 = "hello";
var a2 = s2.split("");
if (a2.length == 5 && a2[0] == "h" && a2[4] == "o") {
  ok++;
} else {
  console.log("es1/String.prototype.split.js: split('') failed");
}

var s3 = "test";
var a3 = s3.split();
if (a3.length == 1 && a3[0] == "test") {
  ok++;
} else {
  console.log("es1/String.prototype.split.js: split() no separator failed");
}

var s4 = "a::b::c";
var a4 = s4.split("::");
if (a4.length == 3 && a4[0] == "a" && a4[1] == "b" && a4[2] == "c") {
  ok++;
} else {
  console.log("es1/String.prototype.split.js: split multi-char separator failed");
}

if (ok == 4) {
  console.log("es1/String.prototype.split.js: OK");
} else {
  console.log("es1/String.prototype.split.js: failed");
}
