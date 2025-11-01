// ES1: 15.5.4.11 String.prototype.toLowerCase()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "HELLO";
if (s1.toLowerCase() == "hello") {
  ok++;
} else {
  console.log("es1.String.prototype.toLowerCase.js: toLowerCase failed");
}

var s2 = "ABC123";
if (s2.toLowerCase() == "abc123") {
  ok++;
} else {
  console.log("es1.String.prototype.toLowerCase.js: toLowerCase with numbers failed");
}

var s3 = "hello";
if (s3.toLowerCase() == "hello") {
  ok++;
} else {
  console.log("es1.String.prototype.toLowerCase.js: already lowercase failed");
}

if (ok == 3) {
  console.log("es1.String.prototype.toLowerCase.js: OK");
} else {
  console.log("es1.String.prototype.toLowerCase.js: FAIL");
}
