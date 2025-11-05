// ES3: 15.5.4.12 String.prototype.search (regexp)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "hello world";
var result1 = s1.search(/world/);
if (result1 == 6) {
  ok++;
} else {
  console.log("es3/String.prototype.search.js: basic search failed");
}

var s2 = "abc123def";
var result2 = s2.search(/\d+/);
if (result2 == 3) {
  ok++;
} else {
  console.log("es3/String.prototype.search.js: search for digits failed");
}

var s3 = "test";
var result3 = s3.search(/x/);
if (result3 == -1) {
  ok++;
} else {
  console.log("es3/String.prototype.search.js: no match should return -1");
}

var s4 = "hello";
var result4 = s4.search("ll");
if (result4 == 2) {
  ok++;
} else {
  console.log("es3/String.prototype.search.js: search with string failed");
}

var s5 = "aaa";
var re5 = /a/g;
re5.lastIndex = 10;
var result5 = s5.search(re5);
if (result5 == 0) {
  ok++;
} else {
  console.log("es3/String.prototype.search.js: search ignores lastIndex failed");
}

if (ok == 5) {
  console.log("es3/String.prototype.search.js: OK");
} else {
  console.log("es3/String.prototype.search.js: failed");
}
