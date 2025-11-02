// ES3: 15.10.7.4 multiline
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var re1 = new RegExp("abc", "m");
if (re1.multiline == true) {
  ok++;
} else {
  console.log("es3.RegExp.multiline.js: constructor with m failed");
}

var re2 = new RegExp("abc");
if (re2.multiline == false) {
  ok++;
} else {
  console.log("es3.RegExp.multiline.js: constructor without m failed");
}

var re3 = /abc/m;
if (re3.multiline == true) {
  ok++;
} else {
  console.log("es3.RegExp.multiline.js: literal with m failed");
}

var re4 = /abc/;
if (re4.multiline == false) {
  ok++;
} else {
  console.log("es3.RegExp.multiline.js: literal without m failed");
}

if (ok == 4) {
  console.log("es3.RegExp.multiline.js: OK");
} else {
  console.log("es3.RegExp.multiline.js: FAIL");
}
