// ES1: 15.9.5.14 Date.prototype.getHours()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1, 14, 30, 45, 123);
if (d.getHours() == 14) {
  console.log("es1.Date.prototype.getHours.js: OK");
} else {
  console.log("es1.Date.prototype.getHours.js: FAIL");
}
