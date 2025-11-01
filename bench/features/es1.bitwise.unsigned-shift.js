// ES1: 11.7.3 The unsigned right shift operator (>>>)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = -12345;
var b = a >>> 2;
if (b == 1073738737) {
  ok++;
} else {
  console.log("es1.bitwise.unsigned-shift.js: -12345 >>> 2 == " + b);
}

// Idiom to cast to unsigned int
var c = a >>> 0;
if (c == 4294954951) {
  ok++;
} else {
  console.log("es1.bitwise.unsigned-shift.js: -12345 >>> 0 != 4294954951");
}

if (ok == 2) {
  console.log("es1.bitwise.unsigned-shift.js: OK");
} else {
  console.log("es1.bitwise.unsigned-shift.js: FAIL");
}
