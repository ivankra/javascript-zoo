// ES1: 15.9.5.35 Date.prototype.setUTCMonth(mon [, date])
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 0, 1));
d.setUTCMonth(11);
if (d.getUTCMonth() == 11) {
  console.log("es1.Date.prototype.setUTCMonth.js: OK");
} else {
  console.log("es1.Date.prototype.setUTCMonth.js: FAIL");
}
