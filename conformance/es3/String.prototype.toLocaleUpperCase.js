// ES3: 15.5.4.19 String.prototype.toLocaleUpperCase ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var str = "hello";
var res = str.toLocaleUpperCase();
if (res == "HELLO") {
  console.log("es3/String.prototype.toLocaleUpperCase.js: OK");
} else {
  console.log("es3/String.prototype.toLocaleUpperCase.js: 'hello'.toLocaleUpperCase() != 'HELLO' (got: '" + res + "')");
}
