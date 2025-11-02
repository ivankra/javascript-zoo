// ES3: 15.8.2.12 min ( [ value1 [ , value2 [ , … ] ] ] )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var result0 = Math.min();
if (result0 == Infinity) {
  ok++;
} else {
  console.log("es3.Math.min.variadic.js: min() with 0 args failed");
}

var result1 = Math.min(5);
if (result1 == 5) {
  ok++;
} else {
  console.log("es3.Math.min.variadic.js: min() with 1 arg failed");
}

var result2 = Math.min(3, 7);
if (result2 == 3) {
  ok++;
} else {
  console.log("es3.Math.min.variadic.js: min() with 2 args failed");
}

var result3 = Math.min(3, 7, 5);
if (result3 == 3) {
  ok++;
} else {
  console.log("es3.Math.min.variadic.js: min() with 3 args failed");
}

var result4 = Math.min(1, NaN, 3);
if (isNaN(result4)) {
  ok++;
} else {
  console.log("es3.Math.min.variadic.js: min() with NaN failed");
}

if (ok == 5) {
  console.log("es3.Math.min.variadic.js: OK");
} else {
  console.log("es3.Math.min.variadic.js: FAIL");
}
