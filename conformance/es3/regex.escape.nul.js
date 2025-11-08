// ES3: 15.10.2.11 DecimalEscape
// DecimalEscape :: 0
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var r = /\0/.exec("\x00");

if (r != null && r[0] == "\x00") {
  console.log("es3/regex.escape.nul.js: OK");
} else {
  console.log("es3/regex.escape.nul.js: failed");
}
