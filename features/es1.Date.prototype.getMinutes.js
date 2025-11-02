// ES1: 15.9.5.16 Date.prototype.getMinutes()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1, 14, 30, 45, 123);
if (d.getMinutes() == 30) {
  console.log("es1.Date.prototype.getMinutes.js: OK");
} else {
  console.log("es1.Date.prototype.getMinutes.js: FAIL");
}
