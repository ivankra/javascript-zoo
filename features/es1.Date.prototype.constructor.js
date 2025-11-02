// ES1: 15.9.5.1 Date.prototype.constructor
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (Date.prototype.constructor == Date) {
  console.log("es1.Date.prototype.constructor.js: OK");
} else {
  console.log("es1.Date.prototype.constructor.js: FAIL");
}
