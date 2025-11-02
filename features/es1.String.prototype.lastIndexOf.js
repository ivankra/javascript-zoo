// ES1: 15.5.4.7 String.prototype.lastIndexOf(searchString, position)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s = "hello world";
if (s.lastIndexOf("o") == 7) {
  ok++;
} else {
  console.log("es1.String.prototype.lastIndexOf.js: lastIndexOf('o') failed");
}

if (s.lastIndexOf("l") == 9) {
  ok++;
} else {
  console.log("es1.String.prototype.lastIndexOf.js: lastIndexOf('l') failed");
}

if (s.lastIndexOf("o", 5) == 4) {
  ok++;
} else {
  console.log("es1.String.prototype.lastIndexOf.js: lastIndexOf with position failed");
}

if (s.lastIndexOf("hello") == 0) {
  ok++;
} else {
  console.log("es1.String.prototype.lastIndexOf.js: lastIndexOf at start failed");
}

if (s.lastIndexOf("xyz") == -1) {
  ok++;
} else {
  console.log("es1.String.prototype.lastIndexOf.js: lastIndexOf not found failed");
}

if (ok == 5) {
  console.log("es1.String.prototype.lastIndexOf.js: OK");
} else {
  console.log("es1.String.prototype.lastIndexOf.js: FAIL");
}
