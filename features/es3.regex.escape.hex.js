// ES3: 15.10.2.10 CharacterEscape
// CharacterEscape :: HexEscapeSequence
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /\x41/.exec("A");
if (r1[0] == "A") {
  ok++;
} else {
  console.log("es3.regex.escape.hex.js: \\x41 failed");
}

var r2 = /\x20/.exec(" ");
if (r2[0] == " ") {
  ok++;
} else {
  console.log("es3.regex.escape.hex.js: \\x20 failed");
}

if (ok == 2) {
  console.log("es3.regex.escape.hex.js: OK");
} else {
  console.log("es3.regex.escape.hex.js: FAIL");
}
