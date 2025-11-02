// ES3: 15.10.7.3 ignoreCase
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var re1 = new RegExp("abc", "i");
if (re1.ignoreCase == true) {
  ok++;
} else {
  console.log("es3.RegExp.ignoreCase.js: constructor with i failed");
}

var re2 = new RegExp("abc");
if (re2.ignoreCase == false) {
  ok++;
} else {
  console.log("es3.RegExp.ignoreCase.js: constructor without i failed");
}

var re3 = /abc/i;
if (re3.ignoreCase == true) {
  ok++;
} else {
  console.log("es3.RegExp.ignoreCase.js: literal with i failed");
}

var re4 = /abc/;
if (re4.ignoreCase == false) {
  ok++;
} else {
  console.log("es3.RegExp.ignoreCase.js: literal without i failed");
}

if (ok == 4) {
  console.log("es3.RegExp.ignoreCase.js: OK");
} else {
  console.log("es3.RegExp.ignoreCase.js: FAIL");
}
