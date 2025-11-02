// ES3: 15.4.4.7 Array.prototype.push ( [ item1 [ , item2 [ , … ] ] ] )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = new Array();
a1[0] = 1;
a1[1] = 2;
var len1 = a1.push(3);
if (len1 == 3 && a1.length == 3 && a1[2] == 3) {
  ok++;
} else {
  console.log("es3.Array.prototype.push.js: push single element failed");
}

var a2 = new Array();
var len2 = a2.push(1, 2, 3);
if (len2 == 3 && a2.length == 3 && a2[0] == 1 && a2[1] == 2 && a2[2] == 3) {
  ok++;
} else {
  console.log("es3.Array.prototype.push.js: push multiple elements failed");
}

var a3 = new Array();
a3[0] = 1;
var len3 = a3.push();
if (len3 == 1 && a3.length == 1) {
  ok++;
} else {
  console.log("es3.Array.prototype.push.js: push with no arguments failed");
}

var a4 = new Array();
a4.push(1);
a4.push(2);
a4.push(3);
if (a4.length == 3 && a4[0] == 1 && a4[1] == 2 && a4[2] == 3) {
  ok++;
} else {
  console.log("es3.Array.prototype.push.js: multiple push calls failed");
}

var a5 = new Array();
a5[0] = 10;
var len5 = a5.push(20, 30);
if (len5 == 3 && a5[1] == 20 && a5[2] == 30) {
  ok++;
} else {
  console.log("es3.Array.prototype.push.js: push to non-empty array failed");
}

if (ok == 5) {
  console.log("es3.Array.prototype.push.js: OK");
} else {
  console.log("es3.Array.prototype.push.js: FAIL");
}
