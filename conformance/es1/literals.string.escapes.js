// ES1: 7.7.4 String Literals
// SingleEscapeCharacter :: one of ' " \ b f n r t
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var s = "\'\"\\\b\f\n\r\t";
if (s.length == 8) {
  console.log("es1/literals.string.escapes.js: OK");
} else {
  console.log("es1/literals.string.escapes.js: failed");
}
