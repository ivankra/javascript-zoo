// ES1: 15.1.2.2 parseInt(string, radix)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var a = "0x123";
var b = parseInt(a);
var c = b + 0;
if (c == 291) {
  console.log("es1.lib.parseInt.hex.js: OK");
} else {
  console.log("es1.lib.parseInt.hex.js: FAIL");
}
