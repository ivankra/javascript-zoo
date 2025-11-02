// ES3: 15.5.4.14 String.prototype.split (separator, limit)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "a1b2c3";
var result1 = s1.split(/\d/);
if (result1.length == 4 && result1[0] == "a" && result1[1] == "b" && result1[2] == "c" && result1[3] == "") {
  ok++;
} else {
  console.log("es3.String.prototype.split.regex.js: split with regex failed");
}

var s2 = "A<B>bold</B>";
var result2 = s2.split(/<([^<>]+)>/);
if (result2.length == 5 && result2[0] == "A" && result2[1] == "B" && result2[2] == "bold" && result2[3] == "/B" && result2[4] == "") {
  ok++;
} else {
  console.log("es3.String.prototype.split.regex.js: split with capturing group failed");
}

var s3 = "hello";
var result3 = s3.split(/e/);
if (result3.length == 2 && result3[0] == "h" && result3[1] == "llo") {
  ok++;
} else {
  console.log("es3.String.prototype.split.regex.js: split on single match failed");
}

var s4 = "test";
var result4 = s4.split(/x/);
if (result4.length == 1 && result4[0] == "test") {
  ok++;
} else {
  console.log("es3.String.prototype.split.regex.js: split with no match failed");
}

var s5 = "a b c";
var result5 = s5.split(/\s/);
if (result5.length == 3 && result5[0] == "a" && result5[1] == "b" && result5[2] == "c") {
  ok++;
} else {
  console.log("es3.String.prototype.split.regex.js: split on whitespace failed");
}

var s6 = "abc";
var result6 = s6.split(/(?:)/);
if (result6.length == 3 && result6[0] == "a" && result6[1] == "b" && result6[2] == "c") {
  ok++;
} else {
  console.log("es3.String.prototype.split.regex.js: split by empty regex failed");
}

if (ok == 6) {
  console.log("es3.String.prototype.split.regex.js: OK");
} else {
  console.log("es3.String.prototype.split.regex.js: FAIL");
}
