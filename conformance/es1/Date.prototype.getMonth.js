// ES1: 15.9.5.8 Date.prototype.getMonth()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 5, 15);
if (d.getMonth() == 5) {
  console.log("es1/Date.prototype.getMonth.js: OK");
} else {
  console.log("es1/Date.prototype.getMonth.js: failed");
}
