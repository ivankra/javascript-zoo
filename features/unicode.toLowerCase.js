// ES1: 15.5.4.11 String.prototype.toLowerCase()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "ПРИВЕТ";
if (s1.toLowerCase() == "привет") {
  ok++;
} else {
  console.log("unicode.toLowerCase.js: Cyrillic failed");
}

var s2 = "ΕΛΛΗΝΙΚΆ";
if (s2.toLowerCase() == "ελληνικά") {
  ok++;
} else {
  console.log("unicode.toLowerCase.js: Greek failed");
}

var s3 = "ÄÖÜ";
if (s3.toLowerCase() == "äöü") {
  ok++;
} else {
  console.log("unicode.toLowerCase.js: German umlauts failed");
}

if (ok == 3) {
  console.log("unicode.toLowerCase.js: OK");
} else {
  console.log("unicode.toLowerCase.js: failed");
}
