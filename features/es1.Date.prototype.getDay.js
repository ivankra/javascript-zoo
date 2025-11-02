// ES1: 15.9.5.12 Date.prototype.getDay()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1);
if (d.getDay() == 6) {
  console.log("es1.Date.prototype.getDay.js: OK");
} else {
  console.log("es1.Date.prototype.getDay.js: FAIL");
}
