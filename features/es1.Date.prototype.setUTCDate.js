// ES1: 15.9.5.33 Date.prototype.setUTCDate(date)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 0, 1));
d.setUTCDate(15);
if (d.getUTCDate() == 15) {
  console.log("es1.Date.prototype.setUTCDate.js: OK");
} else {
  console.log("es1.Date.prototype.setUTCDate.js: FAIL");
}
