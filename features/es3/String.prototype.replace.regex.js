// ES3: 15.5.4.11 String.prototype.replace (searchValue, replaceValue)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "hello 123 world";
var result1 = s1.replace(/\d+/, "NUM");
if (result1 == "hello NUM world") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.regex.js: non-global regex replace failed");
}

var s2 = "a1b2c3";
var result2 = s2.replace(/\d/g, "X");
if (result2 == "aXbXcX") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.regex.js: global regex replace failed");
}

var s3 = "test TEST test";
var result3 = s3.replace(/test/i, "foo");
if (result3 == "foo TEST test") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.regex.js: case-insensitive replace failed");
}

var s4 = "hello world";
var result4 = s4.replace(/x/, "y");
if (result4 == "hello world") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.regex.js: no match should return original failed");
}

var s5 = "aaa";
var result5 = s5.replace(/a/g, "b");
if (result5 == "bbb") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.regex.js: replace all occurrences failed");
}

if (ok == 5) {
  console.log("es3/String.prototype.replace.regex.js: OK");
} else {
  console.log("es3/String.prototype.replace.regex.js: failed");
}
