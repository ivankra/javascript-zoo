// ES3: 7.2 White Space
//
// ES3 recognizes Unicode category "Zs" space separators as whitespace.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var x = 1;  // var<U+2000>x: \u2000 EN QUAD
var y = 2;  // var<U+2003>y: \u2003 EM SPACE
var　z = 3;  // var<U+3000>z: \u3000 IDEOGRAPHIC SPACE

if (x == 1 && y == 2 && z == 3) {
  console.log("es3.source.whitespace.unicode.js: OK");
} else {
  console.log("es3.source.whitespace.unicode.js: FAIL");
}
