// ES1: 7.7.4 String Literals
// ES3: B.1.2 String Literals
// ES2022: 12.8.4 String Literals
// ESnext: 12.8.4 String Literals
// https://262.ecma-international.org/#sec-literals-string-literals
//
// Part of ES1, moved to Annex B in ES3, moved back to
// core language in ES2022 as LegacyOctalEscapeSequence.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if ("\101" == "A" && "\141" == "a") {
  console.log("es2022.literals.string.legacy-octal.js: OK");
} else {
  console.log("es2022.literals.string.legacy-octal.js: FAIL");
}
