// ES1: 15.5.4.9 String.prototype.substring(start)
// ES1: 15.5.4.10 String.prototype.substring(start, end)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s = "hello";
if (s.substring(1) == "ello") {
  ok++;
} else {
  console.log("es1/String.prototype.substring.js: substring(1) failed");
}

if (s.substring(0) == "hello") {
  ok++;
} else {
  console.log("es1/String.prototype.substring.js: substring(0) failed");
}

if (s.substring(1, 4) == "ell") {
  ok++;
} else {
  console.log("es1/String.prototype.substring.js: substring(1, 4) failed");
}

if (s.substring(2, 2) == "") {
  ok++;
} else {
  console.log("es1/String.prototype.substring.js: substring(2, 2) failed");
}

if (s.substring(4, 1) == "ell") {
  ok++;
} else {
  console.log("es1/String.prototype.substring.js: substring swap failed");
}

if (ok == 5) {
  console.log("es1/String.prototype.substring.js: OK");
} else {
  console.log("es1/String.prototype.substring.js: failed");
}
