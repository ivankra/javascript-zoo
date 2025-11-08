// ES3: 15.5.4.9 String.prototype.localeCompare (that)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "a";
var result1 = s1.localeCompare("b");
if (result1 < 0) {
  ok++;
} else {
  console.log("es3/String.prototype.localeCompare.js: a before b failed");
}

var s2 = "b";
var result2 = s2.localeCompare("a");
if (result2 > 0) {
  ok++;
} else {
  console.log("es3/String.prototype.localeCompare.js: b after a failed");
}

var s3 = "test";
var result3 = s3.localeCompare("test");
if (result3 == 0) {
  ok++;
} else {
  console.log("es3/String.prototype.localeCompare.js: equal strings failed");
}

var s4 = "";
var result4 = s4.localeCompare("");
if (result4 == 0) {
  ok++;
} else {
  console.log("es3/String.prototype.localeCompare.js: empty strings failed");
}

var s5 = "abc";
var result5 = s5.localeCompare("abd");
if (result5 < 0) {
  ok++;
} else {
  console.log("es3/String.prototype.localeCompare.js: abc before abd failed");
}

if (ok == 5) {
  console.log("es3/String.prototype.localeCompare.js: OK");
} else {
  console.log("es3/String.prototype.localeCompare.js: failed");
}
