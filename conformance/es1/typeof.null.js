// ES1: 11.4.3 The typeof operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var a = null;
var b = typeof a;
if (b == "object") {
  console.log("es1/typeof.null.js: OK");
} else {
  console.log("es1/typeof.null.js: typeof null != 'object'");
}
