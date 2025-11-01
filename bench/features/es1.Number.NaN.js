// ES1: 15.7.3.4 Number.NaN
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var n = Number.NaN;
if (n != n) {
  console.log("es1.Number.NaN.js: OK");
} else {
  console.log("es1.Number.NaN.js: FAIL");
}
