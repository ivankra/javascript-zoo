// ES3: 15.9.5.5 Date.prototype.toLocaleString ( )
// ES6: 20.3.4.39 Date.prototype.toLocaleString ( [ reserved1 [ , reserved2 ] ] )
//
// Per ES6, implementations don't include ECMA-402 (Intl)
// should return an implementation-defined String value.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date();
var res = d.toLocaleString();
if (typeof res == "string" && res.length > 0) {
  console.log("es3.Date.prototype.toLocaleString.js: OK");
} else {
  console.log("es3.Date.prototype.toLocaleString.js: FAIL");
}
