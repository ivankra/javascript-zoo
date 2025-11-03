// ES1: 7.7.3 Numeric Literals
// ES3: B.1.1 Numeric Literals
// ES2022: 12.9.3 Numeric Literals
// ESnext: 12.9.3 Numeric Literals
// https://262.ecma-international.org/#sec-literals-numeric-literals
//
// Part of ES1, moved to Annex B in ES3, moved back to
// core language in ES2022 as LegacyOctalIntegerLiteral.
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
