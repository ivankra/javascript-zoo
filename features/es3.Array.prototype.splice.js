// ES3: 15.4.4.12 Array.prototype.splice (start, deleteCount [ , item1 [ , item2 [ , … ] ] ] )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = new Array();
a1[0] = 1;
a1[1] = 2;
a1[2] = 3;
a1[3] = 4;
var deleted1 = a1.splice(1, 2);
if (deleted1.length == 2 && deleted1[0] == 2 && deleted1[1] == 3 && a1.length == 2 && a1[0] == 1 && a1[1] == 4) {
  ok++;
} else {
  console.log("es3.Array.prototype.splice.js: delete elements failed");
}

var a2 = new Array();
a2[0] = 1;
a2[1] = 2;
a2[2] = 3;
var deleted2 = a2.splice(1, 1, 10, 20);
if (deleted2.length == 1 && deleted2[0] == 2 && a2.length == 4 && a2[0] == 1 && a2[1] == 10 && a2[2] == 20 && a2[3] == 3) {
  ok++;
} else {
  console.log("es3.Array.prototype.splice.js: delete and insert failed");
}

var a3 = new Array();
a3[0] = 1;
a3[1] = 2;
a3[2] = 3;
var deleted3 = a3.splice(1, 0, 10);
if (deleted3.length == 0 && a3.length == 4 && a3[0] == 1 && a3[1] == 10 && a3[2] == 2 && a3[3] == 3) {
  ok++;
} else {
  console.log("es3.Array.prototype.splice.js: insert without delete failed");
}

var a4 = new Array();
a4[0] = 1;
a4[1] = 2;
a4[2] = 3;
a4[3] = 4;
var deleted4 = a4.splice(-2, 1);
if (deleted4.length == 1 && deleted4[0] == 3 && a4.length == 3 && a4[0] == 1 && a4[1] == 2 && a4[2] == 4) {
  ok++;
} else {
  console.log("es3.Array.prototype.splice.js: negative start failed");
}

var a5 = new Array();
var deleted5 = a5.splice(0, 0, 1, 2);
if (deleted5.length == 0 && a5.length == 2 && a5[0] == 1 && a5[1] == 2) {
  ok++;
} else {
  console.log("es3.Array.prototype.splice.js: splice on empty array failed");
}

if (ok == 5) {
  console.log("es3.Array.prototype.splice.js: OK");
} else {
  console.log("es3.Array.prototype.splice.js: FAIL");
}
