// ES3: 15.5.4.13 String.prototype.slice (start, end)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var obj = new Number(12345);
var result = String.prototype.slice.call(obj, 1, 4);
if (result == "234") {
  console.log("es3/String.prototype.slice.generic.js: OK");
} else {
  console.log("es3/String.prototype.slice.generic.js: failed");
}
