// ES1: 15.1.2.2 parseInt(string, radix)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var a = "123";
var b = parseInt(a);
var c = b + 0;
if (c == 123) {
  console.log("es1.global.parseInt.js: OK");
} else {
  console.log("es1.global.parseInt.js: FAIL");
}
