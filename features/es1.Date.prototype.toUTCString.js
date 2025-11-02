// ES1: 15.9.5.40 Date.prototype.toUTCString()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date();
if (typeof d.toUTCString() == "string") {
  console.log("es1.Date.prototype.toUTCString.js: OK");
} else {
  console.log("es1.Date.prototype.toUTCString.js: FAIL");
}
