// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

// The MV (mathematical value) of nfinity is 10^10000 (a value so large that it will round to +∞).
var inf = 1e10000;
var inf2 = 1 / 0;
var ninf = -inf;
var ninf2 = -1 / 0;

if (inf != inf) {
  console.log("es1.numbers.inf.js: 1e10000 is NaN");
} else {
  ok++;
}

if (ninf != ninf) {
  console.log("es1.numbers.inf.js: -1e10000 is NaN");
} else {
  ok++;
}

if (inf2 == inf2) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: 1/0 is NaN");
}

if (ninf2 == ninf2) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: -1/0 is NaN");
}

if (inf == inf2) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: 1/0 != 1e10000");
}

if (ninf == ninf2) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: -1/0 != -1e10000");
}

if (ninf == inf) {
  console.log("es1.numbers.inf.js: Infinity == -Infinity");
} else {
  ok++;
}

if (inf > 1e308) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: +Infinity magnitude failed");
}

if (ninf < -1e308) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: -Infinity magnitude failed");
}

if (inf + inf == inf) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: Infinity + Infinity != Infinity");
}

if (inf * inf == inf) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: Infinity * Infinity != Infinity");
}

var res = inf - inf;
if (res != res) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: Infinity - Infinity is not NaN");
}

res = inf / inf;
if (res != res) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: Infinity / Infinity is not NaN");
}

res = inf + ninf;
if (res != res) {
  ok++;
} else {
  console.log("es1.numbers.inf.js: Infinity + -Infinity is not NaN");
}

if (ok == 14) {
  console.log("es1.numbers.inf.js: OK");
} else {
  console.log("es1.numbers.inf.js: FAIL");
}
