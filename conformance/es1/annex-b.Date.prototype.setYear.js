// ES1: 15.9.5.38 Date.prototype.setYear(year)
// ES3: B.2.5 Date.prototype.setYear (year)
// ESnext: https://262.ecma-international.org/#sec-date.prototype.setyear
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1);
d.setYear(99);
if (d.getFullYear() == 1999) {
  console.log("es1/annex-b.Date.prototype.setYear.js: OK");
} else {
  console.log("es1/annex-b.Date.prototype.setYear.js: failed");
}
