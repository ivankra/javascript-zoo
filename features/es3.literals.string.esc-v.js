// ES3: 7.8.4 String Literals
//
// \v addition
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if ("\v" == "\x0B") {
  console.log("es3.literals.string.esc-v.js: OK");
} else {
  console.log("es3.literals.string.esc-v.js: FAIL");
}
