// ES3: 15.10.2.8 Atom
// Atom :: \ AtomEscape
// CharacterEscape :: IdentityEscape
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /\d/.exec("a1b");
if (r1[0] == "1") {
  ok++;
} else {
  console.log("es3.regex.escape.js: \\d failed");
}

var r2 = /\w/.exec("x");
if (r2[0] == "x") {
  ok++;
} else {
  console.log("es3.regex.escape.js: \\w failed");
}

var r3 = /\s/.exec("a b");
if (r3[0] == " ") {
  ok++;
} else {
  console.log("es3.regex.escape.js: \\s failed");
}

var r4 = /\*/.exec("*");
if (r4[0] == "*") {
  ok++;
} else {
  console.log("es3.regex.escape.js: \\* failed");
}

var r5 = /\[/.exec("[");
if (r5[0] == "[") {
  ok++;
} else {
  console.log("es3.regex.escape.js: \\[ failed");
}

if (ok == 5) {
  console.log("es3.regex.escape.js: OK");
} else {
  console.log("es3.regex.escape.js: FAIL");
}
