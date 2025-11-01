// ES1: 15.9.5.2 Date.prototype.toString()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date();
if (typeof d.toString() == "string") {
  console.log("es1.Date.prototype.toString.js: OK");
} else {
  console.log("es1.Date.prototype.toString.js: FAIL");
}
