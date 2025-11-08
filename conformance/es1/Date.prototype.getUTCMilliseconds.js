// ES1: 15.9.5.21 Date.prototype.getUTCMilliseconds()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 0, 1, 14, 30, 45, 123));
if (d.getUTCMilliseconds() == 123) {
  console.log("es1/Date.prototype.getUTCMilliseconds.js: OK");
} else {
  console.log("es1/Date.prototype.getUTCMilliseconds.js: failed");
}
