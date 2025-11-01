// ES1: 15.9.5.22 Date.prototype.getTimezoneOffset()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date();
if (typeof d.getTimezoneOffset() == "number") {
  console.log("es1.Date.prototype.getTimezoneOffset.js: OK");
} else {
  console.log("es1.Date.prototype.getTimezoneOffset.js: FAIL");
}
