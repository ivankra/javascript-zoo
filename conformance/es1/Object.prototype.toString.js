// ES1: 15.2.4.2 Object.prototype.toString()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var o = new Object();
var s = o.toString();
if (s == "[object Object]") {
  console.log("es1/Object.prototype.toString.js: OK");
} else {
  console.log("es1/Object.prototype.toString.js: failed");
}
