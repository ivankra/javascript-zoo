// ES3: B.2.3 String.prototype.substr (start, length)
// ES6: B.2.3.1 String.prototype.substr (start, length)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var s = "abcdefgh";

var x = s.substr(2, 3);
if (x == "cde") {
  console.log("annexb.es3.String.prototype.substr.js: OK");
} else {
  console.log("annexb.es3.String.prototype.substr.js: FAIL");
}
