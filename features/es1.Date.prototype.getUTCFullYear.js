// ES1: 15.9.5.7 Date.prototype.getUTCFullYear()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 0, 1));
if (d.getUTCFullYear() == 2000) {
  console.log("es1.Date.prototype.getUTCFullYear.js: OK");
} else {
  console.log("es1.Date.prototype.getUTCFullYear.js: FAIL");
}
