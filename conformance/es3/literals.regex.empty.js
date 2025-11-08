// ES3: 7.8.5 Regular Expression Literals
//
// To specify an empty regular expression, use: /(?:)/.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var re = /(?:)/;

if (re.test("") && re.test("abc")) {
  console.log("es3/literals.regex.empty.js: OK");
} else {
  console.log("es3/literals.regex.empty.js: failed");
}
