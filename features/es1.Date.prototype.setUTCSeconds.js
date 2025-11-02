// ES1: 15.9.5.27 Date.prototype.setUTCSeconds(sec [, ms])
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 0, 1, 14, 30, 0, 0));
d.setUTCSeconds(59);
if (d.getUTCSeconds() == 59) {
  console.log("es1.Date.prototype.setUTCSeconds.js: OK");
} else {
  console.log("es1.Date.prototype.setUTCSeconds.js: FAIL");
}
