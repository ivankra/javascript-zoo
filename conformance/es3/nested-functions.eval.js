// ES3: 13 Function Definition
// ES3: 13.2 Creating Function Objects
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

function A() {
  function B(x) {
    return x * x;
  }
  return B;
}
var b1 = A();
if (b1(5) == 25) {
  ok++;
} else {
  console.log("es3/nested-functions.eval.js: function A() returning nested function failed");
}

function C() {
  return eval("(function (x) {return x*x;})");
}
var c1 = C();
if (c1(7) == 49) {
  ok++;
} else {
  console.log("es3/nested-functions.eval.js: function C() returning eval'd function failed");
}

var b2 = A();
if (b2(3) == 9) {
  ok++;
} else {
  console.log("es3/nested-functions.eval.js: second call to A() failed");
}

var c2 = C();
if (c2(4) == 16) {
  ok++;
} else {
  console.log("es3/nested-functions.eval.js: second call to C() failed");
}

if (ok == 4) {
  console.log("es3/nested-functions.eval.js: OK");
} else {
  console.log("es3/nested-functions.eval.js: failed");
}
