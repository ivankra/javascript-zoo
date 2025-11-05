// ES3: 15.4.4.3 Array.prototype.toLocaleString ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = new Array();
a1[0] = 1;
a1[1] = 2;
a1[2] = 3;
var s1 = a1.toLocaleString();
if (typeof s1 == "string" && s1.length > 0) {
  ok++;
} else {
  console.log("es3/Array.prototype.toLocaleString.js: basic toLocaleString failed");
}

var a2 = new Array();
var s2 = a2.toLocaleString();
if (s2 == "") {
  ok++;
} else {
  console.log("es3/Array.prototype.toLocaleString.js: empty array toLocaleString failed");
}

var a3 = new Array();
a3[0] = 1;
var s3 = a3.toLocaleString();
if (s3 == "1") {
  ok++;
} else {
  console.log("es3/Array.prototype.toLocaleString.js: single element toLocaleString failed");
}

var a4 = new Array();
a4[0] = null;
a4[2] = 5;
var s4 = a4.toLocaleString();
if (typeof s4 == "string") {
  ok++;
} else {
  console.log("es3/Array.prototype.toLocaleString.js: null/missing elements failed");
}

var a5 = new Array();
a5[0] = 10;
a5[1] = 20;
a5[2] = 30;
var s5 = a5.toLocaleString();
if (s5.indexOf("10") != -1 && s5.indexOf("20") != -1 && s5.indexOf("30") != -1) {
  ok++;
} else {
  console.log("es3/Array.prototype.toLocaleString.js: multiple elements content failed");
}

if (ok == 5) {
  console.log("es3/Array.prototype.toLocaleString.js: OK");
} else {
  console.log("es3/Array.prototype.toLocaleString.js: failed");
}
