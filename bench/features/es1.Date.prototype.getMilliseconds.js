// ES1: 15.9.5.20 Date.prototype.getMilliseconds()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1, 14, 30, 45, 123);
if (d.getMilliseconds() == 123) {
  console.log("es1.Date.prototype.getMilliseconds.js: OK");
} else {
  console.log("es1.Date.prototype.getMilliseconds.js: FAIL");
}
