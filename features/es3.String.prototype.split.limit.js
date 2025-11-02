// ES3: 15.5.4.14 String.prototype.split (separator, limit)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "a,b,c,d";
var result1 = s1.split(",", 2);
if (result1.length == 2 && result1[0] == "a" && result1[1] == "b") {
  ok++;
} else {
  console.log("es3.String.prototype.split.limit.js: split with limit 2 failed");
}

var s2 = "a,b,c";
var result2 = s2.split(",", 0);
if (result2.length == 0) {
  ok++;
} else {
  console.log("es3.String.prototype.split.limit.js: split with limit 0 failed");
}

var s3 = "a,b,c";
var result3 = s3.split(",", 10);
if (result3.length == 3 && result3[0] == "a" && result3[1] == "b" && result3[2] == "c") {
  ok++;
} else {
  console.log("es3.String.prototype.split.limit.js: split with limit exceeding splits failed");
}

var s4 = "a,b,c,d,e";
var result4 = s4.split(",", 3);
if (result4.length == 3 && result4[0] == "a" && result4[1] == "b" && result4[2] == "c") {
  ok++;
} else {
  console.log("es3.String.prototype.split.limit.js: split with limit 3 failed");
}

var s5 = "hello world";
var result5 = s5.split(" ", 1);
if (result5.length == 1 && result5[0] == "hello") {
  ok++;
} else {
  console.log("es3.String.prototype.split.limit.js: split with limit 1 failed");
}

if (ok == 5) {
  console.log("es3.String.prototype.split.limit.js: OK");
} else {
  console.log("es3.String.prototype.split.limit.js: FAIL");
}
