// ES1: 15.9.5.15 Date.prototype.getUTCHours()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 0, 1, 14, 30, 45, 123));
if (d.getUTCHours() == 14) {
  console.log("es1/Date.prototype.getUTCHours.js: OK");
} else {
  console.log("es1/Date.prototype.getUTCHours.js: failed");
}
