// ES1: 12.9 The return statement
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

function f1() {
  return 42;
}
var r1 = f1();
if (r1 == 42) {
  ok++;
} else {
  console.log("es1.return.js: return with value failed");
}

function f2() {
  return 10 + 20;
}
var r2 = f2();
if (r2 == 30) {
  ok++;
} else {
  console.log("es1.return.js: return with expression failed");
}

function f3() {
  return;
}
var r3 = f3();
if (r3 == null) {  // == null is nullish comparison, expect undefined here
  ok++;
} else {
  console.log("es1.return.js: return without value failed");
}

function f4() {
  return "test";
}
var r4 = f4();
if (r4 == "test") {
  ok++;
} else {
  console.log("es1.return.js: return string failed");
}

if (ok == 4) {
  console.log("es1.return.js: OK");
} else {
  console.log("es1.return.js: FAIL");
}
