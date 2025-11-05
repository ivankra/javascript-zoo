// ES1: 15.9.5.19 Date.prototype.getUTCSeconds()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 0, 1, 14, 30, 45, 123));
if (d.getUTCSeconds() == 45) {
  console.log("es1/Date.prototype.getUTCSeconds.js: OK");
} else {
  console.log("es1/Date.prototype.getUTCSeconds.js: failed");
}
