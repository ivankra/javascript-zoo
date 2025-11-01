// ES1: 15.5.4.6 String.prototype.indexOf(searchString, position)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s = "hello world";
if (s.indexOf("world") == 6) {
  ok++;
} else {
  console.log("es1.String.prototype.indexOf.js: indexOf('world') failed");
}

if (s.indexOf("hello") == 0) {
  ok++;
} else {
  console.log("es1.String.prototype.indexOf.js: indexOf at start failed");
}

if (s.indexOf("o") == 4) {
  ok++;
} else {
  console.log("es1.String.prototype.indexOf.js: indexOf('o') failed");
}

if (s.indexOf("o", 5) == 7) {
  ok++;
} else {
  console.log("es1.String.prototype.indexOf.js: indexOf with position failed");
}

if (s.indexOf("xyz") == -1) {
  ok++;
} else {
  console.log("es1.String.prototype.indexOf.js: indexOf not found failed");
}

if (ok == 5) {
  console.log("es1.String.prototype.indexOf.js: OK");
} else {
  console.log("es1.String.prototype.indexOf.js: FAIL");
}
