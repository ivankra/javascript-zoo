// ES1: 11.13 Assignment operators
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var i = 10;
if (i == 10) {
  ok++;
} else {
  console.log("es1.assignment.js: = failed");
}

i *= 3;
if (i == 30) {
  ok++;
} else {
  console.log("es1.assignment.js: *= failed");
}

i /= 6;
if (i == 5) {
  ok++;
} else {
  console.log("es1.assignment.js: /= failed");
}

i += 15;
if (i == 20) {
  ok++;
} else {
  console.log("es1.assignment.js: += failed");
}

i -= 8;
if (i == 12) {
  ok++;
} else {
  console.log("es1.assignment.js: -= failed");
}

i %= 5;
if (i == 2) {
  ok++;
} else {
  console.log("es1.assignment.js: %= failed");
}

if (ok == 6) {
  console.log("es1.assignment.js: OK");
} else {
  console.log("es1.assignment.js: FAIL");
}
