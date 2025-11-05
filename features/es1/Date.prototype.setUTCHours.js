// ES1: 15.9.5.31 Date.prototype.setUTCHours(hour [, min [, sec [, ms]]])
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0));
d.setUTCHours(23);
if (d.getUTCHours() == 23) {
  console.log("es1/Date.prototype.setUTCHours.js: OK");
} else {
  console.log("es1/Date.prototype.setUTCHours.js: failed");
}
