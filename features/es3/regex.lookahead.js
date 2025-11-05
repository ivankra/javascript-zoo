// ES3: 15.10.2.8 Atom
// Atom :: (?= Disjunction )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /(?=(a+))/.exec("baaabac");
if (r1[0] == "" && r1[1] == "aaa") {
  ok++;
} else {
  console.log("es3/regex.lookahead.js: spec example failed");
}

var r2 = /a(?=b)/.exec("abc");
if (r2[0] == "a") {
  ok++;
} else {
  console.log("es3/regex.lookahead.js: zero-width failed");
}

var r3 = /a(?=b)/.exec("ac");
if (r3 == null) {
  ok++;
} else {
  console.log("es3/regex.lookahead.js: no match failed");
}

if (ok == 3) {
  console.log("es3/regex.lookahead.js: OK");
} else {
  console.log("es3/regex.lookahead.js: failed");
}
