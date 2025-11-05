// ES1: 15.9.5.34 Date.prototype.setMonth(mon [, date])
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1);
d.setMonth(11);
if (d.getMonth() == 11) {
  console.log("es1/Date.prototype.setMonth.js: OK");
} else {
  console.log("es1/Date.prototype.setMonth.js: failed");
}
