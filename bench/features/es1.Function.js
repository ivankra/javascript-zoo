// ES1: 15.3 Function Objects
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var f1 = new Function("return 42;");
if (f1() == 42) {
  ok++;
} else {
  console.log("es1.Function.js: new Function with body failed");
}

var f2 = new Function("a", "return a + 1;");
if (f2(5) == 6) {
  ok++;
} else {
  console.log("es1.Function.js: new Function with parameter failed");
}

var f3 = new Function("a", "b", "return a + b;");
if (f3(3, 4) == 7) {
  ok++;
} else {
  console.log("es1.Function.js: new Function with two parameters failed");
}

var f4 = Function("x", "return x * 2;");
if (f4(10) == 20) {
  ok++;
} else {
  console.log("es1.Function.js: Function as function failed");
}

if (ok == 4) {
  console.log("es1.Function.js: OK");
} else {
  console.log("es1.Function.js: FAIL");
}
