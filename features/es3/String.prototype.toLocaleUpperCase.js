// ES3: 15.5.4.19 String.prototype.toLocaleUpperCase ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var s1 = "hello";
var result1 = s1.toLocaleUpperCase();
if (result1 == "HELLO") {
  console.log("es3/String.prototype.toLocaleUpperCase.js: OK");
} else {
  console.log("es3/String.prototype.toLocaleUpperCase.js: failed");
}
