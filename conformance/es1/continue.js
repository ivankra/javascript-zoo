// ES1: 12.7 The continue statement
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var i = 0;
var count = 0;
while (i < 10) {
  i++;
  if (i == 5) {
    continue;
  }
  count++;
}
if (count == 9) {
  ok++;
} else {
  console.log("es1/continue.js: while with continue failed");
}

var sum = 0;
for (var j = 0; j < 10; j++) {
  if (j == 3) {
    continue;
  }
  sum += j;
}
if (sum == 42) {
  ok++;
} else {
  console.log("es1/continue.js: for with continue failed");
}

var n = 0;
var m = 0;
while (n < 5) {
  n++;
  if (n < 3) {
    continue;
  }
  m++;
}
if (m == 3) {
  ok++;
} else {
  console.log("es1/continue.js: while with conditional continue failed");
}

if (ok == 3) {
  console.log("es1/continue.js: OK");
} else {
  console.log("es1/continue.js: failed");
}
