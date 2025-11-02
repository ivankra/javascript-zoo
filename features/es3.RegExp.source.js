// ES3: 15.10.7.1 source
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var re = new RegExp("abc");

if (re.source == "abc") {
  console.log("es3.RegExp.source.js: OK");
} else {
  console.log("es3.RegExp.source.js: FAIL");
}
