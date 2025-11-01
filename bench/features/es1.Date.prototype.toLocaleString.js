// ES1: 15.9.5.39 Date.prototype.toLocaleString()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date();
if (typeof d.toLocaleString() == "string") {
  console.log("es1.Date.prototype.toLocaleString.js: OK");
} else {
  console.log("es1.Date.prototype.toLocaleString.js: FAIL");
}
