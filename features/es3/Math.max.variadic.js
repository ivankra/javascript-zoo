// ES3: 15.8.2.11 max ( [ value1 [ , value2 [ , … ] ] ] )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var result0 = Math.max();
if (result0 == -Infinity) {
  ok++;
} else {
  console.log("es3/Math.max.variadic.js: max() with 0 args failed");
}

var result1 = Math.max(5);
if (result1 == 5) {
  ok++;
} else {
  console.log("es3/Math.max.variadic.js: max() with 1 arg failed");
}

var result2 = Math.max(3, 7);
if (result2 == 7) {
  ok++;
} else {
  console.log("es3/Math.max.variadic.js: max() with 2 args failed");
}

var result3 = Math.max(3, 7, 5);
if (result3 == 7) {
  ok++;
} else {
  console.log("es3/Math.max.variadic.js: max() with 3 args failed");
}

var result4 = Math.max(1, NaN, 3);
if (isNaN(result4)) {
  ok++;
} else {
  console.log("es3/Math.max.variadic.js: max() with NaN failed");
}

if (ok == 5) {
  console.log("es3/Math.max.variadic.js: OK");
} else {
  console.log("es3/Math.max.variadic.js: failed");
}
