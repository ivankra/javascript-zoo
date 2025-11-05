// ES1: 7.7.4 String Literals (Hexadecimal Escape Sequences)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if ("\x41" == "A" && "\x61" == "a") {
  console.log("es1/literals.string.hex.js: OK");
} else {
  console.log("es1/literals.string.hex.js: failed");
}
