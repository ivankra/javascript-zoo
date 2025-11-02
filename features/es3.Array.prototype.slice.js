// ES3: 15.4.4.10 Array.prototype.slice (start, end)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = new Array();
a1[0] = 1;
a1[1] = 2;
a1[2] = 3;
a1[3] = 4;
var sliced1 = a1.slice(1, 3);
if (sliced1.length == 2 && sliced1[0] == 2 && sliced1[1] == 3) {
  ok++;
} else {
  console.log("es3.Array.prototype.slice.js: slice with start and end failed");
}

var a2 = new Array();
a2[0] = 1;
a2[1] = 2;
a2[2] = 3;
var sliced2 = a2.slice(1);
if (sliced2.length == 2 && sliced2[0] == 2 && sliced2[1] == 3) {
  ok++;
} else {
  console.log("es3.Array.prototype.slice.js: slice with start only failed");
}

var a3 = new Array();
a3[0] = 1;
a3[1] = 2;
a3[2] = 3;
var sliced3 = a3.slice(-2);
if (sliced3.length == 2 && sliced3[0] == 2 && sliced3[1] == 3) {
  ok++;
} else {
  console.log("es3.Array.prototype.slice.js: slice with negative start failed");
}

var a4 = new Array();
a4[0] = 1;
a4[1] = 2;
a4[2] = 3;
a4[3] = 4;
var sliced4 = a4.slice(1, -1);
if (sliced4.length == 2 && sliced4[0] == 2 && sliced4[1] == 3) {
  ok++;
} else {
  console.log("es3.Array.prototype.slice.js: slice with negative end failed");
}

var a5 = new Array();
a5[0] = 1;
a5[1] = 2;
a5[2] = 3;
var sliced5 = a5.slice(0);
if (sliced5.length == 3 && sliced5[0] == 1 && sliced5[1] == 2 && sliced5[2] == 3) {
  ok++;
} else {
  console.log("es3.Array.prototype.slice.js: slice entire array failed");
}

if (ok == 5) {
  console.log("es3.Array.prototype.slice.js: OK");
} else {
  console.log("es3.Array.prototype.slice.js: FAIL");
}
