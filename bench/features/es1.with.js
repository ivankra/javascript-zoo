// ES1: 12.10 The WITH statement
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var r = 2, a;
with (Math) {
  a = PI * r * r;
  if (abs(a - 12.566) < 0.01) {
    console.log("es1.with.js: OK");
  } else {
    console.log("es1.with.js: FAIL");
  }
}
