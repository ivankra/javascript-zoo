// ES3: 15.9.5.7 Date.prototype.toLocaleTimeString ( )
// ES6: 20.3.4.40 Date.prototype.toLocaleTimeString ( [ reserved1 [ , reserved2 ] ] )
//
// Per ES6, implementations don't include ECMA-402 (Intl)
// should return an implementation-defined String value.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d = new Date();
var res = d.toLocaleTimeString();
if (typeof res == "string" && res.length > 0) {
  console.log("es3.Date.prototype.toLocaleTimeString.js: OK");
} else {
  console.log("es3.Date.prototype.toLocaleTimeString.js: FAIL");
}
