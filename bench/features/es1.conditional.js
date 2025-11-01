// ES1: 11.12 Conditional operator ( ?: )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var t = true;
var f = false;

var i = t ? 1 : 2;
if (i == 1) {
  ok++;
} else {
  console.log("es1.conditional.js: true ? 1 : 2 failed");
}

var j = f ? 1 : 2;
if (j == 2) {
  ok++;
} else {
  console.log("es1.conditional.js: false ? 1 : 2 failed");
}

var k = (5 > 3) ? 100 : 200;
if (k == 100) {
  ok++;
} else {
  console.log("es1.conditional.js: (5 > 3) ? 100 : 200 failed");
}

var m = (5 < 3) ? 100 : 200;
if (m == 200) {
  ok++;
} else {
  console.log("es1.conditional.js: (5 < 3) ? 100 : 200 failed");
}

var a = 0;
var b = 0;

var n = t ? (a = 10) : (b = 20);
if (n == 10) {
  ok++;
} else {
  console.log("es1.conditional.js: true ? (a = 10) : (b = 20) failed");
}

if (a == 10) {
  ok++;
} else {
  console.log("es1.conditional.js: true branch assignment failed");
}

if (b == 0) {
  ok++;
} else {
  console.log("es1.conditional.js: true branch short-circuit failed");
}

var p = f ? (a = 30) : (b = 40);
if (p == 40) {
  ok++;
} else {
  console.log("es1.conditional.js: false ? (a = 30) : (b = 40) failed");
}

if (a == 10) {
  ok++;
} else {
  console.log("es1.conditional.js: false branch short-circuit failed");
}

if (b == 40) {
  ok++;
} else {
  console.log("es1.conditional.js: false branch assignment failed");
}

var s = t ? "yes" : "no";
if (s == "yes") {
  ok++;
} else {
  console.log("es1.conditional.js: true ? 'yes' : 'no' failed");
}

var q = f ? "yes" : "no";
if (q == "no") {
  ok++;
} else {
  console.log("es1.conditional.js: false ? 'yes' : 'no' failed");
}

if (ok == 12) {
  console.log("es1.conditional.js: OK");
} else {
  console.log("es1.conditional.js: FAIL");
}
