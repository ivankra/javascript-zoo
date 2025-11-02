// ES1: 15.4.5.2 length
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = new Array();
if (a1.length == 0) {
  ok++;
} else {
  console.log("es1.Array.length.js: empty array length failed");
}

var a2 = new Array(5);
if (a2.length == 5) {
  ok++;
} else {
  console.log("es1.Array.length.js: new Array(len) length failed");
}

var a3 = new Array(1, 2, 3);
if (a3.length == 3) {
  ok++;
} else {
  console.log("es1.Array.length.js: new Array(items) length failed");
}

var a4 = new Array();
a4[0] = 1;
a4[1] = 2;
if (a4.length == 2) {
  ok++;
} else {
  console.log("es1.Array.length.js: length auto-update failed");
}

var a5 = new Array(1, 2, 3, 4, 5);
a5.length = 3;
if (a5.length == 3) {
  ok++;
} else {
  console.log("es1.Array.length.js: length assignment failed");
}

var a6 = new Array();
a6[100] = "x";
if (a6.length == 101) {
  ok++;
} else {
  console.log("es1.Array.length.js: length > max index failed");
}

if (ok == 6) {
  console.log("es1.Array.length.js: OK");
} else {
  console.log("es1.Array.length.js: FAIL");
}
