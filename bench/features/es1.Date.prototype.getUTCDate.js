// ES1: 15.9.5.11 Date.prototype.getUTCDate()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 5, 15));
if (d.getUTCDate() == 15) {
  console.log("es1.Date.prototype.getUTCDate.js: OK");
} else {
  console.log("es1.Date.prototype.getUTCDate.js: FAIL");
}
