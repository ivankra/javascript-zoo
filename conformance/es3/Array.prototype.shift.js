// ES3: 15.4.4.9 Array.prototype.shift ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = new Array();
a1[0] = 1;
a1[1] = 2;
a1[2] = 3;
var shifted1 = a1.shift();
if (shifted1 == 1 && a1.length == 2 && a1[0] == 2 && a1[1] == 3) {
  ok++;
} else {
  console.log("es3/Array.prototype.shift.js: shift from array failed");
}

var a2 = new Array();
a2[0] = 42;
var shifted2 = a2.shift();
if (shifted2 == 42 && a2.length == 0) {
  ok++;
} else {
  console.log("es3/Array.prototype.shift.js: shift single element failed");
}

var a3 = new Array();
var shifted3 = a3.shift();
if (a3.length == 0 && typeof shifted3 == "undefined") {
  ok++;
} else {
  console.log("es3/Array.prototype.shift.js: shift from empty array failed");
}

var a4 = new Array();
a4[0] = 10;
a4[1] = 20;
a4[2] = 30;
a4.shift();
a4.shift();
if (a4.length == 1 && a4[0] == 30) {
  ok++;
} else {
  console.log("es3/Array.prototype.shift.js: multiple shifts failed");
}

var a5 = new Array();
a5[0] = "a";
a5[2] = "c";
var shifted5 = a5.shift();
if (shifted5 == "a" && a5.length == 2 && a5[1] == "c") {
  ok++;
} else {
  console.log("es3/Array.prototype.shift.js: shift sparse array failed");
}

if (ok == 5) {
  console.log("es3/Array.prototype.shift.js: OK");
} else {
  console.log("es3/Array.prototype.shift.js: failed");
}
