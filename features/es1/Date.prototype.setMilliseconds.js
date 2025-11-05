// ES1: 15.9.5.24 Date.prototype.setMilliseconds(ms)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1, 14, 30, 45, 0);
d.setMilliseconds(999);
if (d.getMilliseconds() == 999) {
  console.log("es1/Date.prototype.setMilliseconds.js: OK");
} else {
  console.log("es1/Date.prototype.setMilliseconds.js: failed");
}
