// ES3: 15.5.4.11 String.prototype.replace (searchValue, replaceValue)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "John Doe";
var result1 = s1.replace(/(\w+) (\w+)/, "$2, $1");
if (result1 == "Doe, John") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.capture.js: swap with $1 $2 failed");
}

var s2 = "hello";
var result2 = s2.replace(/(l+)/, "[$1]");
if (result2 == "he[ll]o") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.capture.js: bracket capture $1 failed");
}

var s3 = "abc123def";
var result3 = s3.replace(/([a-z]+)(\d+)([a-z]+)/, "$3-$2-$1");
if (result3 == "def-123-abc") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.capture.js: reorder with $1 $2 $3 failed");
}

var s4 = "test";
var result4 = s4.replace(/(t)/, "$1$1");
if (result4 == "ttest") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.capture.js: duplicate $1 failed");
}

var s5 = "foo";
var result5 = s5.replace(/(o)/g, "[$1]");
if (result5 == "f[o][o]") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.capture.js: global replace with capture failed");
}

if (ok == 5) {
  console.log("es3.String.prototype.replace.capture.js: OK");
} else {
  console.log("es3.String.prototype.replace.capture.js: FAIL");
}
