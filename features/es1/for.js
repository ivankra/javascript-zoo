// ES1: 12.6.2 The for statement
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var i;
for (i = 0; i < 5; i++) {
}
if (i == 5) {
  ok++;
} else {
  console.log("es1/for.js: basic for loop failed");
}

var sum = 0;
for (var j = 0; j < 10; j++) {
  sum += j;
}
if (sum == 45) {
  ok++;
} else {
  console.log("es1/for.js: for loop with var failed");
}

var k;
for (k = 0; k < 10; k++) {
  if (k == 7) {
    break;
  }
}
if (k == 7) {
  ok++;
} else {
  console.log("es1/for.js: for with break failed");
}

var count = 0;
for (var m = 0; m < 10; m++) {
  if (m == 5) {
    continue;
  }
  count++;
}
if (count == 9) {
  ok++;
} else {
  console.log("es1/for.js: for with continue failed");
}

var n = 0;
for (; n < 3; n++) {
}
if (n == 3) {
  ok++;
} else {
  console.log("es1/for.js: for without init failed");
}

var p = 0;
for (var q = 0; q < 5;) {
  q++;
  p++;
}
if (p == 5) {
  ok++;
} else {
  console.log("es1/for.js: for without increment failed");
}

var r = 0;
for (var s = 0; s < 5; s++) {
  r++;
}
if (r == 5 && s == 5) {
  ok++;
} else {
  console.log("es1/for.js: for loop counter failed");
}

var t = 0;
for (var u = 1, v = 2; u < 4; u++) {
  t += v;
}
if (t == 6) {
  ok++;
} else {
  console.log("es1/for.js: for with multiple var declarations failed");
}

if (ok == 8) {
  console.log("es1/for.js: OK");
} else {
  console.log("es1/for.js: failed");
}
