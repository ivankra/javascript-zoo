// ES3: 15.5.4.13 String.prototype.slice (start, end)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "hello world";
var result1 = s1.slice(0, 5);
if (result1 == "hello") {
  ok++;
} else {
  console.log("es3/String.prototype.slice.js: slice with start and end failed");
}

var s2 = "hello world";
var result2 = s2.slice(6);
if (result2 == "world") {
  ok++;
} else {
  console.log("es3/String.prototype.slice.js: slice with start only failed");
}

var s3 = "hello world";
var result3 = s3.slice(-5);
if (result3 == "world") {
  ok++;
} else {
  console.log("es3/String.prototype.slice.js: slice with negative start failed");
}

var s4 = "hello world";
var result4 = s4.slice(0, -6);
if (result4 == "hello") {
  ok++;
} else {
  console.log("es3/String.prototype.slice.js: slice with negative end failed");
}

var s5 = "test";
var result5 = s5.slice(1, 3);
if (result5 == "es") {
  ok++;
} else {
  console.log("es3/String.prototype.slice.js: slice middle characters failed");
}

if (ok == 5) {
  console.log("es3/String.prototype.slice.js: OK");
} else {
  console.log("es3/String.prototype.slice.js: failed");
}
