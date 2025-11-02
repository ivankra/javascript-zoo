// ES3: 15.5.4.10 String.prototype.match (regexp)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "abc123def";
var result1 = s1.match(/\d+/);
if (result1 && result1[0] == "123" && result1.index == 3) {
  ok++;
} else {
  console.log("es3.String.prototype.match.js: non-global match failed");
}

var s2 = "a1b2c3";
var result2 = s2.match(/\d/g);
if (result2 && result2.length == 3 && result2[0] == "1" && result2[1] == "2" && result2[2] == "3") {
  ok++;
} else {
  console.log("es3.String.prototype.match.js: global match failed");
}

var s3 = "hello";
var result3 = s3.match(/\d/);
if (result3 == null) {
  ok++;
} else {
  console.log("es3.String.prototype.match.js: no match should return null");
}

var s4 = "test123";
var result4 = s4.match("test");
if (result4 && result4[0] == "test") {
  ok++;
} else {
  console.log("es3.String.prototype.match.js: match with string failed");
}

var s5 = "aaaa";
var result5 = s5.match(/a/g);
if (result5 && result5.length == 4) {
  ok++;
} else {
  console.log("es3.String.prototype.match.js: multiple global matches failed");
}

if (ok == 5) {
  console.log("es3.String.prototype.match.js: OK");
} else {
  console.log("es3.String.prototype.match.js: FAIL");
}
