// ES3: 15.5.4.6 String.prototype.concat ([ string1 [ , string2 [ , … ] ] ] )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var obj = new Number(123);
var result = String.prototype.concat.call(obj, "45");
if (result == "12345") {
  console.log("es3.String.prototype.concat.generic.js: OK");
} else {
  console.log("es3.String.prototype.concat.generic.js: FAIL");
}
