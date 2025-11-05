// ES3: 15.10.2.7 Quantifier
// QuantifierPrefix :: +
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /a+/.exec("aaab");
if (r1[0] == "aaa") {
  ok++;
} else {
  console.log("es3/regex.quantifier.plus.js: multiple matches failed");
}

var r2 = /a+/.exec("b");
if (r2 == null) {
  ok++;
} else {
  console.log("es3/regex.quantifier.plus.js: no match failed");
}

var r3 = /a+/.exec("a");
if (r3[0] == "a") {
  ok++;
} else {
  console.log("es3/regex.quantifier.plus.js: single match failed");
}

if (ok == 3) {
  console.log("es3/regex.quantifier.plus.js: OK");
} else {
  console.log("es3/regex.quantifier.plus.js: failed");
}
