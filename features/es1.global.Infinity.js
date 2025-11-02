// ES1: 15.1.1.2 Infinity
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var a = Infinity;
if (a > 0 && a > 1000000000) {
  console.log("es1.global.Infinity.js: OK");
} else {
  console.log("es1.global.Infinity.js: FAIL");
}
