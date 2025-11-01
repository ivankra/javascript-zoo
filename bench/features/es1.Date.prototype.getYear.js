// ES1: 15.9.5.5 Date.prototype.getYear()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1);
var year = d.getYear();
if (year == 100) {
  console.log("es1.Date.prototype.getYear.js: OK");
} else {
  console.log("es1.Date.prototype.getYear.js: FAIL - got " + year + ", expected 100");
}
