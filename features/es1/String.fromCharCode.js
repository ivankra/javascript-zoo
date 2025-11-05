// ES1: 15.5.3.2 String.fromCharCode(char0, char1, ...)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = String.fromCharCode();
if (s1 == "") {
  ok++;
} else {
  console.log("es1/String.fromCharCode.js: fromCharCode() failed");
}

var s2 = String.fromCharCode(65);
if (s2 == "A") {
  ok++;
} else {
  console.log("es1/String.fromCharCode.js: fromCharCode(65) failed");
}

var s3 = String.fromCharCode(72, 101, 108, 108, 111);
if (s3 == "Hello") {
  ok++;
} else {
  console.log("es1/String.fromCharCode.js: fromCharCode(Hello) failed");
}

var s4 = String.fromCharCode(97, 98, 99);
if (s4 == "abc") {
  ok++;
} else {
  console.log("es1/String.fromCharCode.js: fromCharCode(abc) failed");
}

if (ok == 4) {
  console.log("es1/String.fromCharCode.js: OK");
} else {
  console.log("es1/String.fromCharCode.js: failed");
}
