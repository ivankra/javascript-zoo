// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var inf = 1 / 0;
var ninf = -1 / 0;

// Infinity is not NaN (Infinity == Infinity)
if (inf == inf) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: 1/0 != 1/0 - Infinity mixed with NaN?");
}

// +Infinity is greater than any number
if (inf > 1e308) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: +Infinity magnitude failed");
}

// -Infinity is less than any number
if (ninf < -1e308) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: -Infinity magnitude failed");
}

// Infinity + Infinity = Infinity
if (inf + inf == inf) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: Inf + Inf failed");
}

// Infinity - Infinity = NaN
var r = inf - inf;
if (r != r) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: Inf - Inf => NaN failed");
}

if (ok == 5) {
  console.log("es1.numbers.inf.js: OK");
} else {
  console.log("es1.numbers.inf.js: FAIL");
}
