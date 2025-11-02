// ES1: 7.7.3 Numeric Literals
// ES3: B.1.1 Numeric Literals
// ES6: B.1.1 Numeric Literals
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = 0755;
if (a == 493) {
  ok++;
} else {
  console.log("es1.literals.octal.js: 0755 failed");
}

var b = 0377777777777777777;
if (b == 9007199254740991) {
  ok++;
} else {
  console.log("es1.literals.octal.js: max safe integer failed");
}

if (ok == 2) {
  console.log("es1.literals.octal.js: OK");
} else {
  console.log("es1.literals.octal.js: FAIL");
}
