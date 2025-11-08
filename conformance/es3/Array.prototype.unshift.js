// ES3: 15.4.4.13 Array.prototype.unshift ( [ item1 [ , item2 [ , … ] ] ] )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = new Array();
a1[0] = 2;
a1[1] = 3;
var len1 = a1.unshift(1);
if (len1 == 3 && a1.length == 3 && a1[0] == 1 && a1[1] == 2 && a1[2] == 3) {
  ok++;
} else {
  console.log("es3/Array.prototype.unshift.js: unshift single element failed");
}

var a2 = new Array();
a2[0] = 3;
var len2 = a2.unshift(1, 2);
if (len2 == 3 && a2.length == 3 && a2[0] == 1 && a2[1] == 2 && a2[2] == 3) {
  ok++;
} else {
  console.log("es3/Array.prototype.unshift.js: unshift multiple elements failed");
}

var a3 = new Array();
var len3 = a3.unshift(1, 2, 3);
if (len3 == 3 && a3.length == 3 && a3[0] == 1 && a3[1] == 2 && a3[2] == 3) {
  ok++;
} else {
  console.log("es3/Array.prototype.unshift.js: unshift on empty array failed");
}

var a4 = new Array();
a4[0] = 1;
var len4 = a4.unshift();
if (len4 == 1 && a4.length == 1 && a4[0] == 1) {
  ok++;
} else {
  console.log("es3/Array.prototype.unshift.js: unshift with no arguments failed");
}

var a5 = new Array();
a5[0] = 2;
a5[1] = 3;
a5.unshift(1);
if (a5[0] == 1 && a5[1] == 2 && a5[2] == 3 && a5.length == 3) {
  ok++;
} else {
  console.log("es3/Array.prototype.unshift.js: element order after unshift failed");
}

if (ok == 5) {
  console.log("es3/Array.prototype.unshift.js: OK");
} else {
  console.log("es3/Array.prototype.unshift.js: failed");
}
