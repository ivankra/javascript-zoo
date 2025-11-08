// ES1: 15.9.5.13 Date.prototype.getUTCDay()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 0, 1));
if (d.getUTCDay() == 6) {
  console.log("es1/Date.prototype.getUTCDay.js: OK");
} else {
  console.log("es1/Date.prototype.getUTCDay.js: failed");
}
