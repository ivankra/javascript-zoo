// ES1: 11.4 Unary operators
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var i = 12345;
var j = ~i;
if (j == -12346) {
  console.log("es1.bitwise.tilde.js: OK");
} else {
  console.log("es1.bitwise.tilde.js: FAIL");
}
