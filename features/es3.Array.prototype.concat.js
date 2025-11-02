// ES3: 15.4.4.4 Array.prototype.concat ( [ item1 [ , item2 [ , … ] ] ] )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = new Array();
a1[0] = 1;
a1[1] = 2;
var a2 = new Array();
a2[0] = 3;
a2[1] = 4;
var result1 = a1.concat(a2);
if (result1.length == 4 && result1[0] == 1 && result1[1] == 2 && result1[2] == 3 && result1[3] == 4) {
  ok++;
} else {
  console.log("es3.Array.prototype.concat.js: concat two arrays failed");
}

var a3 = new Array();
a3[0] = 1;
var result2 = a3.concat(2, 3);
if (result2.length == 3 && result2[0] == 1 && result2[1] == 2 && result2[2] == 3) {
  ok++;
} else {
  console.log("es3.Array.prototype.concat.js: concat non-array items failed");
}

var a4 = new Array();
a4[0] = 1;
var result3 = a4.concat();
if (result3.length == 1 && result3[0] == 1) {
  ok++;
} else {
  console.log("es3.Array.prototype.concat.js: concat with no arguments failed");
}

var a5 = new Array();
a5[0] = 1;
var a6 = new Array();
a6[0] = 2;
var result4 = a5.concat(a6, 3, 4);
if (result4.length == 4 && result4[0] == 1 && result4[1] == 2 && result4[2] == 3 && result4[3] == 4) {
  ok++;
} else {
  console.log("es3.Array.prototype.concat.js: concat mixed array and non-array failed");
}

var a7 = new Array();
var result5 = a7.concat(1, 2);
if (result5.length == 2 && result5[0] == 1 && result5[1] == 2) {
  ok++;
} else {
  console.log("es3.Array.prototype.concat.js: concat from empty array failed");
}

if (ok == 5) {
  console.log("es3.Array.prototype.concat.js: OK");
} else {
  console.log("es3.Array.prototype.concat.js: FAIL");
}
