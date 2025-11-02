// ES1: 7.7.4 String Literals
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if ("\u0041" == "A" && "\u0061" == "a") {
  console.log("es1.literals.string.unicode.js: OK");
} else {
  console.log("es1.literals.string.unicode.js: FAIL");
}
