// ES3: 15.5.4.17 String.prototype.toLocaleLowerCase ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var str = "HELLO";
var res = str.toLocaleLowerCase();
if (res == "hello") {
  console.log("es3/String.prototype.toLocaleLowerCase.js: OK");
} else {
  console.log("es3/String.prototype.toLocaleLowerCase.js: 'HELLO'.toLocaleLowerCase() != 'hello' (got: '" + res + "')");
}
