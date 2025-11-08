// ES1: 15.5.4.5 String.prototype.charCodeAt(pos)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s = "ABC";
if (s.charCodeAt(0) == 65) {
  ok++;
} else {
  console.log("es1/String.prototype.charCodeAt.js: charCodeAt(0) failed");
}

if (s.charCodeAt(1) == 66) {
  ok++;
} else {
  console.log("es1/String.prototype.charCodeAt.js: charCodeAt(1) failed");
}

if (s.charCodeAt(2) == 67) {
  ok++;
} else {
  console.log("es1/String.prototype.charCodeAt.js: charCodeAt(2) failed");
}

var r = s.charCodeAt(10);
if (r != r) {
  ok++;
} else {
  console.log("es1/String.prototype.charCodeAt.js: charCodeAt out of bounds NaN failed");
}

if (ok == 4) {
  console.log("es1/String.prototype.charCodeAt.js: OK");
} else {
  console.log("es1/String.prototype.charCodeAt.js: failed");
}
