// ES3: 15.9.5.4 Date.prototype.toTimeString ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d1 = new Date();
var result1 = d1.toTimeString();
if (typeof result1 == "string" && result1.length > 0) {
  console.log("es3.Date.prototype.toTimeString.js: OK");
} else {
  console.log("es3.Date.prototype.toTimeString.js: FAIL");
}
