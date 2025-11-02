// ES3: 15.10.2.7 Quantifier
// QuantifierPrefix :: { DecimalDigits }
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /a{3}/.exec("aaaa");
if (r1[0] == "aaa") {
  ok++;
} else {
  console.log("es3.regex.quantifier.exact.js: exact match failed");
}

var r2 = /a{3}/.exec("aa");
if (r2 == null) {
  ok++;
} else {
  console.log("es3.regex.quantifier.exact.js: too few failed");
}

var r3 = /a{2}b/.exec("aab");
if (r3[0] == "aab") {
  ok++;
} else {
  console.log("es3.regex.quantifier.exact.js: exact with sequel failed");
}

if (ok == 3) {
  console.log("es3.regex.quantifier.exact.js: OK");
} else {
  console.log("es3.regex.quantifier.exact.js: FAIL");
}
