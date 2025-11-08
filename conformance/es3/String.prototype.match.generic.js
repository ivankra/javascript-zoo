// ES3: 15.5.4.10 String.prototype.match (regexp)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var obj = new Number(12345);
var result = String.prototype.match.call(obj, /3/);
if (result && result[0] == "3") {
  console.log("es3/String.prototype.match.generic.js: OK");
} else {
  console.log("es3/String.prototype.match.generic.js: failed");
}
