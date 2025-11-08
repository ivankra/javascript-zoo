// ES3: 11.8.6 The instanceof operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var arr = new Array();
if (arr instanceof Array) {
  ok++;
} else {
  console.log("es3/instanceof.js: array instanceof Array failed");
}

var obj = new Object();
if (obj instanceof Object) {
  ok++;
} else {
  console.log("es3/instanceof.js: object instanceof Object failed");
}

var date = new Date();
if (date instanceof Date) {
  ok++;
} else {
  console.log("es3/instanceof.js: date instanceof Date failed");
}

if (!(5 instanceof Object)) {
  ok++;
} else {
  console.log("es3/instanceof.js: number instanceof Object failed");
}

if (!("str" instanceof Object)) {
  ok++;
} else {
  console.log("es3/instanceof.js: string instanceof Object failed");
}

function MyConstructor() {}
var myObj = new MyConstructor();
if (myObj instanceof MyConstructor) {
  ok++;
} else {
  console.log("es3/instanceof.js: custom constructor instanceof failed");
}

if (myObj instanceof Object) {
  ok++;
} else {
  console.log("es3/instanceof.js: custom object instanceof Object failed");
}

if (ok == 7) {
  console.log("es3/instanceof.js: OK");
} else {
  console.log("es3/instanceof.js: failed");
}
