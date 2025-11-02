// ES1: 11.3.1 Postfix increment operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var x = 5;
var y = x++;
if (y == 5 && x == 6) {
  ok++;
} else {
  console.log("es1.postfix.increment.js: basic failed");
}

var a = 0;
var b = a++;
if (b == 0 && a == 1) {
  ok++;
} else {
  console.log("es1.postfix.increment.js: zero failed");
}

var c = -1;
var d = c++;
if (d == -1 && c == 0) {
  ok++;
} else {
  console.log("es1.postfix.increment.js: negative failed");
}

if (ok == 3) {
  console.log("es1.postfix.increment.js: OK");
} else {
  console.log("es1.postfix.increment.js: FAIL");
}
