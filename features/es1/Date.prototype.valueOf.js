// ES1: 15.9.5.3 Date.prototype.valueOf()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date();
// > 2000-01-01
if (d.valueOf() > 946684800000) {
  console.log("es1/Date.prototype.valueOf.js: OK");
} else {
  console.log("es1/Date.prototype.valueOf.js: failed");
}
