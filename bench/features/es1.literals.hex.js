// ES1: 7.7.3 Numeric Literals
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = 0xff;
if (a == 255) {
  ok++;
} else {
  console.log("es1.literals.hex.js: 0xff failed");
}

var b = 0xDEADBEEF;
if (b == 3735928559) {
  ok++;
} else {
  console.log("es1.literals.hex.js: 0xDEADBEEF failed");
}

if (ok == 2) {
  console.log("es1.literals.hex.js: OK");
} else {
  console.log("es1.literals.hex.js: FAIL");
}
