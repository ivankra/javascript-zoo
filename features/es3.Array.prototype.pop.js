// ES3: 15.4.4.6 Array.prototype.pop ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = new Array();
a1[0] = 1;
a1[1] = 2;
a1[2] = 3;
var popped1 = a1.pop();
if (popped1 == 3 && a1.length == 2) {
  ok++;
} else {
  console.log("es3.Array.prototype.pop.js: pop from array failed");
}

var a2 = new Array();
a2[0] = 42;
var popped2 = a2.pop();
if (popped2 == 42 && a2.length == 0) {
  ok++;
} else {
  console.log("es3.Array.prototype.pop.js: pop single element failed");
}

var a3 = new Array();
var popped3 = a3.pop();
if (a3.length == 0) {
  ok++;
} else {
  console.log("es3.Array.prototype.pop.js: pop from empty array failed");
}

var a4 = new Array();
a4[0] = 1;
a4[1] = 2;
a4.pop();
if (a4[0] == 1 && a4.length == 1) {
  ok++;
} else {
  console.log("es3.Array.prototype.pop.js: remaining elements after pop failed");
}

var a5 = new Array();
a5[0] = 10;
a5[1] = 20;
a5.pop();
a5.pop();
if (a5.length == 0) {
  ok++;
} else {
  console.log("es3.Array.prototype.pop.js: multiple pops failed");
}

if (ok == 5) {
  console.log("es3.Array.prototype.pop.js: OK");
} else {
  console.log("es3.Array.prototype.pop.js: FAIL");
}
