// ES1: 15.5.4.12 String.prototype.toUpperCase()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "hello";
if (s1.toUpperCase() == "HELLO") {
  ok++;
} else {
  console.log("es1.String.prototype.toUpperCase.js: toUpperCase failed");
}

var s2 = "abc123";
if (s2.toUpperCase() == "ABC123") {
  ok++;
} else {
  console.log("es1.String.prototype.toUpperCase.js: toUpperCase with numbers failed");
}

var s3 = "HELLO";
if (s3.toUpperCase() == "HELLO") {
  ok++;
} else {
  console.log("es1.String.prototype.toUpperCase.js: already uppercase failed");
}

if (ok == 3) {
  console.log("es1.String.prototype.toUpperCase.js: OK");
} else {
  console.log("es1.String.prototype.toUpperCase.js: FAIL");
}
