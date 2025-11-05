// ES3: 15.5.4.11 String.prototype.replace (searchValue, replaceValue)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "hello world";
var result1 = s1.replace("world", "there");
if (result1 == "hello there") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.str.js: basic string replace failed");
}

var s2 = "test test test";
var result2 = s2.replace("test", "foo");
if (result2 == "foo test test") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.str.js: replace only first occurrence failed");
}

var s3 = "abc";
var result3 = s3.replace("x", "y");
if (result3 == "abc") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.str.js: no match should return original failed");
}

var s4 = "hello";
var result4 = s4.replace("l", "L");
if (result4 == "heLlo") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.str.js: replace first l failed");
}

var s5 = "123";
var result5 = s5.replace("2", "");
if (result5 == "13") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.str.js: replace with empty string failed");
}

if (ok == 5) {
  console.log("es3/String.prototype.replace.str.js: OK");
} else {
  console.log("es3/String.prototype.replace.str.js: failed");
}
