// ES1: 15.9.5.4 Date.prototype.getTime()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date();
// > 2000-01-01
if (d.getTime() > 946684800000) {
  console.log("es1/Date.prototype.getTime.js: OK");
} else {
  console.log("es1/Date.prototype.getTime.js: failed");
}
