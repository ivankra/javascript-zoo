// ES1: 15.9.5.28 Date.prototype.setMinutes(min [, sec [, ms]])
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1, 14, 0, 0, 0);
d.setMinutes(45);
if (d.getMinutes() == 45) {
  console.log("es1.Date.prototype.setMinutes.js: OK");
} else {
  console.log("es1.Date.prototype.setMinutes.js: FAIL");
}
