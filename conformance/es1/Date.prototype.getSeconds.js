// ES1: 15.9.5.18 Date.prototype.getSeconds()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date(2000, 0, 1, 14, 30, 45, 123);
if (d.getSeconds() == 45) {
  console.log("es1/Date.prototype.getSeconds.js: OK");
} else {
  console.log("es1/Date.prototype.getSeconds.js: failed");
}
