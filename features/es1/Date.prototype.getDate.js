// ES1: 15.9.5.10 Date.prototype.getDate()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 5, 15);
if (d.getDate() == 15) {
  console.log("es1/Date.prototype.getDate.js: OK");
} else {
  console.log("es1/Date.prototype.getDate.js: failed");
}
