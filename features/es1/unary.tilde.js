// ES1: 11.4.8 The bitwise NOT operator ( ~ )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = ~5;
if (a == -6) {
  ok++;
} else {
  console.log("es1/unary.tilde.js: ~5 failed");
}

var b = ~(-1);
if (b == 0) {
  ok++;
} else {
  console.log("es1/unary.tilde.js: ~(-1) failed");
}

if (ok == 2) {
  console.log("es1/unary.tilde.js: OK");
} else {
  console.log("es1/unary.tilde.js: failed");
}
