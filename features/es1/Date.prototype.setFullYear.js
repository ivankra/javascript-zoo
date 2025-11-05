// ES1: 15.9.5.36 Date.prototype.setFullYear(year [, mon [, date]])
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1);
d.setFullYear(2025);
if (d.getFullYear() == 2025) {
  console.log("es1/Date.prototype.setFullYear.js: OK");
} else {
  console.log("es1/Date.prototype.setFullYear.js: failed");
}
