// ES1: 15.9.5.5 Date.prototype.getYear()
// ES3: B.2.4 Date.prototype.getYear ( )
// ES6: B.2.4.1 Date.prototype.getYear ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1);
var year = d.getYear();
if (year == 100) {
  console.log("es1.Date.prototype.getYear.js: OK");
} else if (year == 2000) {
  console.log("es1.Date.prototype.getYear.js: non-compliant, expected to return 100 instead of 2000");
} else {
  console.log("es1.Date.prototype.getYear.js: FAIL");
}
