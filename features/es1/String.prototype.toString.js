// ES1: 15.5.4.2 String.prototype.toString()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var s = new String("test");
var t = s.toString();
if (t == "test") {
  console.log("es1/String.prototype.toString.js: OK");
} else {
  console.log("es1/String.prototype.toString.js: failed");
}
