// ES1: 15.9.5.32 Date.prototype.setDate(date)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1);
d.setDate(15);
if (d.getDate() == 15) {
  console.log("es1.Date.prototype.setDate.js: OK");
} else {
  console.log("es1.Date.prototype.setDate.js: FAIL");
}
