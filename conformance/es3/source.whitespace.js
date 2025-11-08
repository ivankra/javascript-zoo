// ES3: 7.2 White Space
//
// ES3 recognizes Tab, Vertical Tab, Form Feed, Space, No-break space, and
// other Unicode category "Zs" space separators as whitespace.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var	x = 1;  // var<TAB>x: \u0009 Tab
vary = 2;     // var<VT>x: \u000B Vertical Tab
varz = 3;     // var<FF>x: \u000C Form Feed
var w = 4;      // var<NBSP>x: \y00A0 No-break space

if (x == 1 && y == 2 && z == 3 && w == 4) {
  console.log("es3/source.whitespace.js: OK");
} else {
  console.log("es3/source.whitespace.js: failed");
}
