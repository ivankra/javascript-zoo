// ES3: 15.10.2.10 CharacterEscape
// CharacterEscape :: UnicodeEscapeSequence
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /\u0041/.exec("A");
if (r1[0] == "A") {
  ok++;
} else {
  console.log("es3.regex.escape.unicode.js: \\u0041 failed");
}

var r2 = /\u0020/.exec(" ");
if (r2[0] == " ") {
  ok++;
} else {
  console.log("es3.regex.escape.unicode.js: \\u0020 failed");
}

if (ok == 2) {
  console.log("es3.regex.escape.unicode.js: OK");
} else {
  console.log("es3.regex.escape.unicode.js: FAIL");
}
