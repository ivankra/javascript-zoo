// ES1: 15.9.5.25 Date.prototype.setUTCMilliseconds(ms)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(Date.UTC(2000, 0, 1, 14, 30, 45, 0));
d.setUTCMilliseconds(999);
if (d.getUTCMilliseconds() == 999) {
  console.log("es1.Date.prototype.setUTCMilliseconds.js: OK");
} else {
  console.log("es1.Date.prototype.setUTCMilliseconds.js: FAIL");
}
