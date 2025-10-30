// Standard: ES1 15.1.2.2 parseInt
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var a = "123";
var b = parseInt(a);
var c = b + 0;
if (b == 123) {
  console.log("es1.lib.parseInt.js: OK");
}
