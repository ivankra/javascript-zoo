// ES1: 15.5.4.3 String.prototype.valueOf()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var s = new String("test");
var v = s.valueOf();
if (v == "test") {
  console.log("es1.String.prototype.valueOf.js: OK");
} else {
  console.log("es1.String.prototype.valueOf.js: FAIL");
}
