// ES1: 15.9.5.37 Date.prototype.setUTCFullYear(year [, mon [, date]])
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 0, 1));
d.setUTCFullYear(2025);
if (d.getUTCFullYear() == 2025) {
  console.log("es1.Date.prototype.setUTCFullYear.js: OK");
} else {
  console.log("es1.Date.prototype.setUTCFullYear.js: FAIL");
}
