// ES1: 12.6.1 The while statement
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var i = 0;
while (i < 5) {
  i++;
}
if (i == 5) {
  ok++;
} else {
  console.log("es1/while.js: basic while loop failed");
}

var j = 0;
var sum = 0;
while (j < 10) {
  sum += j;
  j++;
}
if (sum == 45) {
  ok++;
} else {
  console.log("es1/while.js: while loop sum failed");
}

var k = 0;
while (k < 5) {
  k++;
  if (k == 3) {
    break;
  }
}
if (k == 3) {
  ok++;
} else {
  console.log("es1/while.js: while with break failed");
}

var m = 0;
var n = 0;
while (m < 5) {
  m++;
  if (m == 3) {
    continue;
  }
  n++;
}
if (n == 4) {
  ok++;
} else {
  console.log("es1/while.js: while with continue failed");
}

var p = 10;
while (p < 5) {
  p++;
}
if (p == 10) {
  ok++;
} else {
  console.log("es1/while.js: while false condition failed");
}

var q = 0;
while (true) {
  q++;
  if (q == 7) {
    break;
  }
}
if (q == 7) {
  ok++;
} else {
  console.log("es1/while.js: while true with break failed");
}

if (ok == 6) {
  console.log("es1/while.js: OK");
} else {
  console.log("es1/while.js: failed");
}
