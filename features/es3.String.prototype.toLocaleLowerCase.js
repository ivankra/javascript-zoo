// ES3: 15.5.4.17 String.prototype.toLocaleLowerCase ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var s1 = "HELLO";
var result1 = s1.toLocaleLowerCase();
if (result1 == "hello") {
  console.log("es3.String.prototype.toLocaleLowerCase.js: OK");
} else {
  console.log("es3.String.prototype.toLocaleLowerCase.js: FAIL");
}
