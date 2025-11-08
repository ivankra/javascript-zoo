// ES3: 15.10.2.9 AtomEscape
// ES3: 15.10.2.11 DecimalEscape
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /(a)\1/.exec("aa");
if (r1 != null && r1[0] == "aa" && r1[1] == "a") {
  ok++;
} else {
  console.log("es3/regex.backref.js: backref failed");
}

var r2 = /(a)(b)\2\1/.exec("abba");
if (r2 != null && r2[0] == "abba") {
  ok++;
} else {
  console.log("es3/regex.backref.js: multiple backrefs failed");
}

// If the regular expression has n or more capturing parentheses but
// the nth one is undefined because it hasn't captured anything, then
// the backreference always succeeds.
var r3 = /(a)?b\1/.exec("b");
if (r3 != null && r3[0] == "b") {
  ok++;
} else {
  console.log("es3/regex.backref.js: backref for a group that hasn't captured failed");
}

if (ok == 3) {
  console.log("es3/regex.backref.js: OK");
} else {
  console.log("es3/regex.backref.js: failed");
}
