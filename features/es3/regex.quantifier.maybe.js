// ES3: 15.10.2.7 Quantifier
// QuantifierPrefix :: ?
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /a?/.exec("aa");
if (r1[0] == "a") {
  ok++;
} else {
  console.log("es3/regex.quantifier.maybe.js: one match failed");
}

var r2 = /a?/.exec("b");
if (r2[0] == "") {
  ok++;
} else {
  console.log("es3/regex.quantifier.maybe.js: zero matches failed");
}

var r3 = /a?b/.exec("ab");
if (r3[0] == "ab") {
  ok++;
} else {
  console.log("es3/regex.quantifier.maybe.js: optional match failed");
}

if (ok == 3) {
  console.log("es3/regex.quantifier.maybe.js: OK");
} else {
  console.log("es3/regex.quantifier.maybe.js: failed");
}
