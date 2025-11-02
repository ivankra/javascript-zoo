// ES3: 15.10.2.8 Atom
// Atom :: .
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /a.c/.exec("abc");
if (r1[0] == "abc") {
  ok++;
} else {
  console.log("es3.regex.dot.js: dot match failed");
}

var r2 = /a.c/.exec("ac");
if (r2 == null) {
  ok++;
} else {
  console.log("es3.regex.dot.js: no character failed");
}

var r3 = /./.exec("x");
if (r3[0] == "x") {
  ok++;
} else {
  console.log("es3.regex.dot.js: single char failed");
}

if (ok == 3) {
  console.log("es3.regex.dot.js: OK");
} else {
  console.log("es3.regex.dot.js: FAIL");
}
