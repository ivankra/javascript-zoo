// Standard: ES1 11.7.3 The unsigned right shift operator (>>>)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var a = -12345;
var b = a >>> 2;
if (b == 1073738737) {
  console.log("es1.unsigned-shift.js: OK");
} else {
  console.log("es1.unsigned-shift.js: -12345 >>> 2 == " + b);
}
