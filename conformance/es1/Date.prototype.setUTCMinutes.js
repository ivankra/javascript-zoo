// ES1: 15.9.5.29 Date.prototype.setUTCMinutes(min [, sec [, ms]])
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 0, 1, 14, 0, 0, 0));
d.setUTCMinutes(45);
if (d.getUTCMinutes() == 45) {
  console.log("es1/Date.prototype.setUTCMinutes.js: OK");
} else {
  console.log("es1/Date.prototype.setUTCMinutes.js: failed");
}
