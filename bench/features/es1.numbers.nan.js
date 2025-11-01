// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var nan = 0 / 0;

// NaN is not equal to itself
if (nan != nan) {
  ok++;
} else {
  console.log("es1.numbers.nan.js: NaN != NaN failed");
}

// NaN in arithmetic
var r1 = nan + 5;
if (r1 != r1) {
  ok++;
} else {
  console.log("es1.numbers.nan.js: NaN + 5 failed");
}

var r2 = 10 * nan;
if (r2 != r2) {
  ok++;
} else {
  console.log("es1.numbers.nan.js: 10 * NaN failed");
}

if (ok == 3) {
  console.log("es1.numbers.nan.js: OK");
} else {
  console.log("es1.numbers.nan.js: FAIL");
}
