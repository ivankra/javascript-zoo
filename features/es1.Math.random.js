// ES1: 15.8.2.14 Math.random()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var r = Math.random();
if (r >= 0 && r < 1) {
  console.log("es1.Math.random.js: OK");
} else {
  console.log("es1.Math.random.js: FAIL");
}
