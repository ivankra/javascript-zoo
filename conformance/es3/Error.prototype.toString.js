// ES3: 15.11.4.4 Error.prototype.toString ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var e = new Error("test");
if (typeof e.toString() == "string") {
  console.log("es3/Error.prototype.toString.js: OK");
} else {
  console.log("es3/Error.prototype.toString.js: failed");
}
