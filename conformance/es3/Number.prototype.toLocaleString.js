// ES3: 15.7.4.3 Number.prototype.toLocaleString()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var n1 = 123.456;
var result1 = n1.toLocaleString();
if (typeof result1 == "string" && result1.length > 0) {
  console.log("es3/Number.prototype.toLocaleString.js: OK");
} else {
  console.log("es3/Number.prototype.toLocaleString.js: failed");
}
