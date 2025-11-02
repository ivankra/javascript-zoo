// ES3: 15.10.2.8 Atom
// Canonicalize (IgnoreCase)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /abc/i.exec("ABC");
if (r1 != null && r1[0] == "ABC") {
  ok++;
} else {
  console.log("es3.regex.flag.ignorecase.js: case insensitive failed");
}

var r2 = /abc/.exec("ABC");
if (r2 == null) {
  ok++;
} else {
  console.log("es3.regex.flag.ignorecase.js: case sensitive failed");
}

var r3 = /[a-z]/i.exec("M");
if (r3 != null && r3[0] == "M") {
  ok++;
} else {
  console.log("es3.regex.flag.ignorecase.js: charclass failed");
}

var r4 = /a/i.exec("A");
if (r4 != null && r4[0] == "A") {
  ok++;
} else {
  console.log("es3.regex.flag.ignorecase.js: single char failed");
}

if (ok == 4) {
  console.log("es3.regex.flag.ignorecase.js: OK");
} else {
  console.log("es3.regex.flag.ignorecase.js: FAIL");
}
