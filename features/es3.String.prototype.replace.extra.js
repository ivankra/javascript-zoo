// ES3: 15.5.4.11 String.prototype.replace (searchValue, replaceValue)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "abc";
var r1 = s1.replace(/b/, "$$");
if (r1 == "a$c") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.extra.js: $$ failed");
}

var s2 = "abc";
var r2 = s2.replace(/b/, "$&$&");
if (r2 == "abbc") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.extra.js: $& failed");
}

var s3 = "abc";
var r3 = s3.replace(/b/, "[$`]");
if (r3 == "a[a]c") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.extra.js: $` failed");
}

var s4 = "abc";
var r4 = s4.replace(/b/, "[$']");
if (r4 == "a[c]c") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.extra.js: $' failed");
}

var s5 = "abc";
var r5 = s5.replace(/b/, "$&-$`-$'-$$");
if (r5 == "ab-a-c-$c") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.extra.js: combined replacements failed");
}

if (ok == 5) {
  console.log("es3.String.prototype.replace.extra.js: OK");
} else {
  console.log("es3.String.prototype.replace.extra.js: FAIL");
}
