// ES1: 15.4.4.3 Array.prototype.join(separator)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = new Array(1, 2, 3);
var s1 = a1.join();
if (s1 == "1,2,3") {
  ok++;
} else {
  console.log("es1.Array.prototype.join.js: join() without separator failed");
}

var a2 = new Array("a", "b", "c");
var s2 = a2.join("-");
if (s2 == "a-b-c") {
  ok++;
} else {
  console.log("es1.Array.prototype.join.js: join with separator failed");
}

var a3 = new Array();
var s3 = a3.join(",");
if (s3 == "") {
  ok++;
} else {
  console.log("es1.Array.prototype.join.js: empty array join failed");
}

var a4 = new Array(1, 2, 3);
var s4 = a4.join("");
if (s4 == "123") {
  ok++;
} else {
  console.log("es1.Array.prototype.join.js: join with empty separator failed");
}

var a5 = new Array("x", "y");
var s5 = a5.join(" | ");
if (s5 == "x | y") {
  ok++;
} else {
  console.log("es1.Array.prototype.join.js: join with multi-char separator failed");
}

if (ok == 5) {
  console.log("es1.Array.prototype.join.js: OK");
} else {
  console.log("es1.Array.prototype.join.js: FAIL");
}
