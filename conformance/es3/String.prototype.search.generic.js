// ES3: 15.5.4.12 String.prototype.search (regexp)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var obj = new Number(12345);
var result = String.prototype.search.call(obj, /3/);
if (result == 2) {
  console.log("es3/String.prototype.search.generic.js: OK");
} else {
  console.log("es3/String.prototype.search.generic.js: failed");
}
