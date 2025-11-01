// ES1: 12.8 The break statement
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var i = 0;
while (i < 10) {
  i++;
  if (i == 5) {
    break;
  }
}
if (i == 5) {
  ok++;
} else {
  console.log("es1.break.js: while with break failed");
}

var j = 0;
for (var k = 0; k < 10; k++) {
  j++;
  if (k == 7) {
    break;
  }
}
if (j == 8) {
  ok++;
} else {
  console.log("es1.break.js: for with break failed");
}

var m = 0;
while (true) {
  m++;
  if (m == 3) {
    break;
  }
}
if (m == 3) {
  ok++;
} else {
  console.log("es1.break.js: while true with break failed");
}

var n = 0;
for (var p = 0; p < 100; p++) {
  if (p > 5) {
    break;
  }
  n++;
}
if (n == 6) {
  ok++;
} else {
  console.log("es1.break.js: for with conditional break failed");
}

if (ok == 4) {
  console.log("es1.break.js: OK");
} else {
  console.log("es1.break.js: FAIL");
}
