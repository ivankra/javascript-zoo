// ES1: 12.9 The return statement
// ES1: 11.4.3 The typeof operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

function f1() {
  return 42;
}
var r1 = f1();
if (typeof r1 == "number") {
  ok++;
} else {
  console.log("es1/return.typeof.js: return number failed");
}

function f2() {
  return "test";
}
var r2 = f2();
if (typeof r2 == "string") {
  ok++;
} else {
  console.log("es1/return.typeof.js: return string failed");
}

function f3() {
  return;
}
var r3 = f3();
if (typeof r3 == "undefined") {
  ok++;
} else {
  console.log("es1/return.typeof.js: return without value failed");
}

function f4() {
}
var r4 = f4();
if (typeof r4 == "undefined") {
  ok++;
} else {
  console.log("es1/return.typeof.js: no return statement failed");
}

if (ok == 4) {
  console.log("es1/return.typeof.js: OK");
} else {
  console.log("es1/return.typeof.js: failed");
}
