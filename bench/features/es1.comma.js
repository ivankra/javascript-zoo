// ES1: 11.14 Comma operator ( , )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var i = (1, 2, 3);
if (i == 3) {
  ok++;
} else {
  console.log("es1.comma.js: (1, 2, 3) failed");
}

var j = (5 + 5, 10 + 10);
if (j == 20) {
  ok++;
} else {
  console.log("es1.comma.js: (5 + 5, 10 + 10) failed");
}

var a = 0;
var b = 0;
var k = (a = 10, b = 20, a + b);
if (k == 30) {
  ok++;
} else {
  console.log("es1.comma.js: (a = 10, b = 20, a + b) failed");
}

if (a == 10) {
  ok++;
} else {
  console.log("es1.comma.js: first expression not evaluated");
}

if (b == 20) {
  ok++;
} else {
  console.log("es1.comma.js: second expression not evaluated");
}

var m = 0;
var n = (m++, m++, m);
if (n == 2) {
  ok++;
} else {
  console.log("es1.comma.js: (m++, m++, m) failed");
}

if (m == 2) {
  ok++;
} else {
  console.log("es1.comma.js: side effects not preserved");
}

var p;
var q = (p = 5, p * 2);
if (q == 10) {
  ok++;
} else {
  console.log("es1.comma.js: (p = 5, p * 2) failed");
}

if (ok == 8) {
  console.log("es1.comma.js: OK");
} else {
  console.log("es1.comma.js: FAIL");
}
