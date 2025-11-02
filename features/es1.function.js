// ES1: 13 Function Definition
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

function f1() {
  return 1;
}
if (f1() == 1) {
  ok++;
} else {
  console.log("es1.function.js: function with no parameters failed");
}

function f2(a) {
  return a;
}
if (f2(5) == 5) {
  ok++;
} else {
  console.log("es1.function.js: function with one parameter failed");
}

function f3(a, b) {
  return a + b;
}
if (f3(3, 4) == 7) {
  ok++;
} else {
  console.log("es1.function.js: function with two parameters failed");
}

function f4(a, b, c) {
  return a + b + c;
}
if (f4(1, 2, 3) == 6) {
  ok++;
} else {
  console.log("es1.function.js: function with three parameters failed");
}

function f5(x) {
  var y = x + 10;
  return y;
}
if (f5(5) == 15) {
  ok++;
} else {
  console.log("es1.function.js: function with local var failed");
}

function f6() {
  var i = 0;
  i = 100;
  return i;
}
if (f6() == 100) {
  ok++;
} else {
  console.log("es1.function.js: function with var assignment failed");
}

if (ok == 6) {
  console.log("es1.function.js: OK");
} else {
  console.log("es1.function.js: FAIL");
}
