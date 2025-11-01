// ES1: 15.9.5.6 Date.prototype.getFullYear()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1);
if (d.getFullYear() == 2000) {
  console.log("es1.Date.prototype.getFullYear.js: OK");
} else {
  console.log("es1.Date.prototype.getFullYear.js: FAIL");
}
