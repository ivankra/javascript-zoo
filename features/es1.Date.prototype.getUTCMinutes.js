// ES1: 15.9.5.17 Date.prototype.getUTCMinutes()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 0, 1, 14, 30, 45, 123));
if (d.getUTCMinutes() == 30) {
  console.log("es1.Date.prototype.getUTCMinutes.js: OK");
} else {
  console.log("es1.Date.prototype.getUTCMinutes.js: FAIL");
}
