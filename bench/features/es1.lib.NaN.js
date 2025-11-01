// ES1: 15.1.1.1 NaN
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var a = NaN;
if (a != a) {
  console.log("es1.lib.NaN.js: OK");
} else {
  console.log("es1.lib.NaN.js: FAIL");
}
