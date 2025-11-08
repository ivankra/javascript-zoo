// ES3: 11.2.5 Function Expressions
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var f1 = function() { return 42; };
if (f1() == 42) {
  ok++;
} else {
  console.log("es3/function-expressions.js: anonymous function expression failed");
}

var f2 = function(x) { return x + 1; };
if (f2(5) == 6) {
  ok++;
} else {
  console.log("es3/function-expressions.js: function expression with parameter failed");
}

var f3 = function add(a, b) { return a + b; };
if (f3(3, 4) == 7) {
  ok++;
} else {
  console.log("es3/function-expressions.js: named function expression failed");
}

var arr = new Array();
arr[0] = function() { return 10; };
if (arr[0]() == 10) {
  ok++;
} else {
  console.log("es3/function-expressions.js: function expression in array failed");
}

var obj = new Object();
obj.method = function(x) { return x * 2; };
if (obj.method(7) == 14) {
  ok++;
} else {
  console.log("es3/function-expressions.js: function expression as object property failed");
}

if (ok == 5) {
  console.log("es3/function-expressions.js: OK");
} else {
  console.log("es3/function-expressions.js: failed");
}
