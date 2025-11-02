// ES3: 15.10.2.8 Atom
// Atom :: (?! Disjunction )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /(.*?)a(?!(a+)b\2c)\2(.*)/.exec("baaabaac");
if (r1[0] == "baaabaac" && r1[1] == "ba" && typeof r1[2] == "undefined" && r1[3] == "abaac") {
  ok++;
} else {
  console.log("es3.regex.negative-lookahead.js: spec example failed");
}

var r2 = /a(?!b)/.exec("ac");
if (r2[0] == "a") {
  ok++;
} else {
  console.log("es3.regex.negative-lookahead.js: negative lookahead failed");
}

var r3 = /a(?!b)/.exec("ab");
if (r3 == null) {
  ok++;
} else {
  console.log("es3.regex.negative-lookahead.js: match when should fail");
}

if (ok == 3) {
  console.log("es3.regex.negative-lookahead.js: OK");
} else {
  console.log("es3.regex.negative-lookahead.js: FAIL");
}
