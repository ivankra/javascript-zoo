// ES1: 11.13 Assignment operators
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var i = -16;
i >>>= 2;
if (i == 1073741820) {
  ok++;
} else {
  console.log("es1.assignment.unsigned-shift.js: >>>= failed");
}

if (ok == 1) {
  console.log("es1.assignment.unsigned-shift.js: OK");
} else {
  console.log("es1.assignment.unsigned-shift.js: FAIL");
}
