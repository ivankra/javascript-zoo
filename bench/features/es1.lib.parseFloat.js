// Standard: ES1 15.1.2.3 parseFloat
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var a = "123.5";
var b = parseFloat(a);
var c = b + 0;
var d = c * 10;
if (b == 1235) {
  console.log("es1.lib.parseFloat.js: OK");
}
