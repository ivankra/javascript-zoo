// ES1: 15.9.5.9 Date.prototype.getUTCMonth()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 5, 15));
if (d.getUTCMonth() == 5) {
  console.log("es1.Date.prototype.getUTCMonth.js: OK");
} else {
  console.log("es1.Date.prototype.getUTCMonth.js: FAIL");
}
