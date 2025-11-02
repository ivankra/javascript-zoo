// ES1: 15.9.5.41 Date.prototype.toGMTString()
// ES3: B.2.6 Date.prototype.toGMTString ( )
// ES6: B.2.4.3 Date.prototype.toGMTString ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date();
if (typeof d.toGMTString() == "string") {
  console.log("es1.Date.prototype.toGMTString.js: OK");
} else {
  console.log("es1.Date.prototype.toGMTString.js: FAIL");
}
