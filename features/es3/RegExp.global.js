// ES3: 15.10.7.2 global
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var re1 = new RegExp("abc", "g");
if (re1.global == true) {
  ok++;
} else {
  console.log("es3/RegExp.global.js: constructor with g failed");
}

var re2 = new RegExp("abc");
if (re2.global == false) {
  ok++;
} else {
  console.log("es3/RegExp.global.js: constructor without g failed");
}

var re3 = /abc/g;
if (re3.global == true) {
  ok++;
} else {
  console.log("es3/RegExp.global.js: literal with g failed");
}

var re4 = /abc/;
if (re4.global == false) {
  ok++;
} else {
  console.log("es3/RegExp.global.js: literal without g failed");
}

if (ok == 4) {
  console.log("es3/RegExp.global.js: OK");
} else {
  console.log("es3/RegExp.global.js: failed");
}
