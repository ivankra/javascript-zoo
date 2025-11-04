// ES1: 15.9.5.41 Date.prototype.toGMTString()
// ES3: B.2.6 Date.prototype.toGMTString ( )
// ESnext: https://262.ecma-international.org/#sec-date.prototype.togmtstring
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date();
if (typeof d.toGMTString() == "string") {
  console.log("annexb.es1.Date.prototype.toGMTString.js: OK");
} else {
  console.log("annexb.es1.Date.prototype.toGMTString.js: FAIL");
}
