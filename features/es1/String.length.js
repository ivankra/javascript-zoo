// ES1: 15.5.5.1 length
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "hello";
if (s1.length == 5) {
  ok++;
} else {
  console.log("es1/String.length.js: string length failed");
}

var s2 = "";
if (s2.length == 0) {
  ok++;
} else {
  console.log("es1/String.length.js: empty string length failed");
}

var s3 = new String("test");
if (s3.length == 4) {
  ok++;
} else {
  console.log("es1/String.length.js: String object length failed");
}

var s4 = "a";
if (s4.length == 1) {
  ok++;
} else {
  console.log("es1/String.length.js: single char length failed");
}

if (ok == 4) {
  console.log("es1/String.length.js: OK");
} else {
  console.log("es1/String.length.js: failed");
}
