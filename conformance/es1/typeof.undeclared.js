// ES1: 11.4.3 The typeof operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var b = typeof a;
if (b == "undefined") {
  console.log("es1/typeof.undeclared.js: OK");
} else {
  console.log("es1/typeof.undeclared.js: typeof <undeclared reference> != 'undefined'");
}
