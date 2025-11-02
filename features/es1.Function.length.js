// ES1: 15.3.3.2 Function.length
// ES1: 15.3.5.1 length
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (Function.length == 1) {
  ok++;
} else {
  console.log("es1.Function.length.js: Function.length failed");
}

function f0() {
  return 1;
}
if (f0.length == 0) {
  ok++;
} else {
  console.log("es1.Function.length.js: function with 0 params length failed");
}

function f1(a) {
  return a;
}
if (f1.length == 1) {
  ok++;
} else {
  console.log("es1.Function.length.js: function with 1 param length failed");
}

function f3(a, b, c) {
  return a + b + c;
}
if (f3.length == 3) {
  ok++;
} else {
  console.log("es1.Function.length.js: function with 3 params length failed");
}

if (ok == 4) {
  console.log("es1.Function.length.js: OK");
} else {
  console.log("es1.Function.length.js: FAIL");
}
