// ES1: 15.9.5.23 Date.prototype.setTime(time)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date();
d.setTime(946684800000);
if (d.getTime() == 946684800000) {
  console.log("es1/Date.prototype.setTime.js: OK");
} else {
  console.log("es1/Date.prototype.setTime.js: failed");
}
