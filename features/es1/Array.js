// ES1: 15.4 Array Objects
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

// ES1: 15.4.3.2 Array.length
if (Array.length == 1) {
  ok++;
} else {
  console.log("es1/Array.js: Array.length failed");
}

// ES1: 15.4.3.1 Array.prototype
if (typeof Array.prototype == "object") {
  ok++;
} else {
  console.log("es1/Array.js: Array.prototype failed");
}

// ES1: 15.4.2.3 new Array()
var a1 = new Array();
if (a1.length == 0) {
  ok++;
} else {
  console.log("es1/Array.js: new Array() failed");
}

// ES1: 15.4.2.2 new Array(len)
var a2 = new Array(5);
if (a2.length == 5) {
  ok++;
} else {
  console.log("es1/Array.js: new Array(len) failed");
}

// ES1: 15.4.2.1 new Array(item0, item1, ...)
var a3 = new Array(1, 2, 3);
if (a3.length == 3 && a3[0] == 1 && a3[1] == 2 && a3[2] == 3) {
  ok++;
} else {
  console.log("es1/Array.js: new Array(item0, item1, ...) failed");
}

// ES1: 15.4.1.2 Array(len)
var a4 = Array(4);
if (a4.length == 4) {
  ok++;
} else {
  console.log("es1/Array.js: Array(len) failed");
}

// ES1: 15.4.1.1 Array(item0, item1, ...)
var a5 = Array(10, 20);
if (a5.length == 2 && a5[0] == 10 && a5[1] == 20) {
  ok++;
} else {
  console.log("es1/Array.js: Array(item0, item1, ...) failed");
}

// ES1: 15.4.1.3 Array()
var a6 = Array();
a6[0] = 1;
a6[1] = 2;
if (a6.length == 2) {
  ok++;
} else {
  console.log("es1/Array.js: Array() + array index length update failed");
}

var a7 = new Array();
a7[5] = "x";
if (a7.length == 6) {
  ok++;
} else {
  console.log("es1/Array.js: sparse array length failed");
}

if (ok == 9) {
  console.log("es1/Array.js: OK");
} else {
  console.log("es1/Array.js: failed");
}
