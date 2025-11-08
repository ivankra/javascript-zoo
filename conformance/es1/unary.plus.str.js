// ES1: 11.4.6 Unary + operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var a = +"5";
if (a == 5 && typeof a == "number") {
  console.log("es1/unary.plus.str.js: OK");
} else {
  console.log("es1/unary.plus.str.js: failed");
}
