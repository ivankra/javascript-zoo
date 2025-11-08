// ES1: 15.5.4.4 String.prototype.charAt(pos)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s = "hello";
if (s.charAt(0) == "h") {
  ok++;
} else {
  console.log("es1/String.prototype.charAt.js: charAt(0) failed");
}

if (s.charAt(4) == "o") {
  ok++;
} else {
  console.log("es1/String.prototype.charAt.js: charAt(4) failed");
}

if (s.charAt(10) == "") {
  ok++;
} else {
  console.log("es1/String.prototype.charAt.js: charAt out of bounds failed");
}

if (s.charAt(-1) == "") {
  ok++;
} else {
  console.log("es1/String.prototype.charAt.js: charAt negative failed");
}

if (ok == 4) {
  console.log("es1/String.prototype.charAt.js: OK");
} else {
  console.log("es1/String.prototype.charAt.js: failed");
}
