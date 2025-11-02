// ES1: 7.7.4 String Literals
// ES3: B.1.2 String Literals
// ES6: B.1.2 String Literals
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if ("\101" == "A" && "\141" == "a") {
  console.log("es1.literals.string.octal.js: OK");
} else {
  console.log("es1.literals.string.octal.js: FAIL");
}
