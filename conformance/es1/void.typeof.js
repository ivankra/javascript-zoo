// ES1: 11.4.2 The void operator
// ES1: 11.4.3 The typeof operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

// 'void(0)' is canonical idiom in ES1 to get undefined
var a = void(0);
var b = typeof a;
if (b == "undefined") {
  console.log("es1/void.typeof.js: OK");
} else {
  console.log("es1/void.typeof.js: typeof void(0) != 'undefined'");
}
