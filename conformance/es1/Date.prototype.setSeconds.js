// ES1: 15.9.5.26 Date.prototype.setSeconds(sec [, ms])
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1, 14, 30, 0, 0);
d.setSeconds(59);
if (d.getSeconds() == 59) {
  console.log("es1/Date.prototype.setSeconds.js: OK");
} else {
  console.log("es1/Date.prototype.setSeconds.js: failed");
}
