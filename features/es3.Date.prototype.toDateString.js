// ES3: 15.9.5.3 Date.prototype.toDateString ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d1 = new Date();
var result1 = d1.toDateString();
if (typeof result1 == "string" && result1.length > 0) {
  console.log("es3.Date.prototype.toDateString.js: OK");
} else {
  console.log("es3.Date.prototype.toDateString.js: FAIL");
}
