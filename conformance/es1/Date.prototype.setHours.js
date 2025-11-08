// ES1: 15.9.5.30 Date.prototype.setHours(hour [, min [, sec [, ms]]])
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1, 0, 0, 0, 0);
d.setHours(23);
if (d.getHours() == 23) {
  console.log("es1/Date.prototype.setHours.js: OK");
} else {
  console.log("es1/Date.prototype.setHours.js: failed");
}
