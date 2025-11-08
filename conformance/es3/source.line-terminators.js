// ES3: 7.3 Line Terminators
//
// ES3 recognizes \u2028 (Line separator) and \u2029 (Paragraph separator)
// as line terminators, in addition to \r and \n.
// Test that they trigger ASI in return.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var f1 = function() {
  return 1;  // return<U+2028>1;
  return 2;
};
if (f1() === undefined) ok++;

var f2 = function() {
  return 3;  // return<U+2029>3;
  return 4;
};
if (f2() === undefined) ok++;

if (ok === 2) {
  console.log("es3/source.line-terminators.js: OK");
} else {
  console.log("es3/source.line-terminators.js: failed");
}
