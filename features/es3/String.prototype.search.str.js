// ES3: 15.5.4.12 String.prototype.search (regexp)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "abc123def";
var result1 = s1.search("\\d+");
if (result1 == 3) {
  ok++;
} else {
  console.log("es3/String.prototype.search.str.js: string with \\d+ pattern failed");
}

var s2 = "hello world";
var result2 = s2.search("\\w+");
if (result2 == 0) {
  ok++;
} else {
  console.log("es3/String.prototype.search.str.js: string with \\w+ pattern failed");
}

var s3 = "test123test";
var result3 = s3.search("[0-9]+");
if (result3 == 4) {
  ok++;
} else {
  console.log("es3/String.prototype.search.str.js: string with [0-9]+ pattern failed");
}

var s4 = "aaa bbb";
var result4 = s4.search("\\s");
if (result4 == 3) {
  ok++;
} else {
  console.log("es3/String.prototype.search.str.js: string with \\s pattern failed");
}

var s5 = "foo.bar";
var result5 = s5.search("\\.");
if (result5 == 3) {
  ok++;
} else {
  console.log("es3/String.prototype.search.str.js: string with \\. pattern failed");
}

if (ok == 5) {
  console.log("es3/String.prototype.search.str.js: OK");
} else {
  console.log("es3/String.prototype.search.str.js: failed");
}
