// ES3: 7.8.5 Regular Expression Literals
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var re = /test/;

if (typeof re === "object") {
  console.log("es3.literals.regex.js: OK");
} else {
  console.log("es3.literals.regex.js: FAIL");
}
