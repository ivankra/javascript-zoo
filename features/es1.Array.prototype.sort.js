// ES1: 15.4.4.5 Array.prototype.sort(comparefn)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = new Array(3, 1, 2);
var r1 = a1.sort();
if (r1 == a1) {
  ok++;
} else {
  console.log("es1.Array.prototype.sort.js: sort returns this failed");
}

if (a1[0] == 1 && a1[1] == 2 && a1[2] == 3) {
  ok++;
} else {
  console.log("es1.Array.prototype.sort.js: numeric sort failed");
}

var a2 = new Array("c", "a", "b");
a2.sort();
if (a2[0] == "a" && a2[1] == "b" && a2[2] == "c") {
  ok++;
} else {
  console.log("es1.Array.prototype.sort.js: string sort failed");
}

function cmp(x, y) {
  return x - y;
};
var a3 = new Array(3, 1, 2);
a3.sort(cmp);
if (a3[0] == 1 && a3[1] == 2 && a3[2] == 3) {
  ok++;
} else {
  console.log("es1.Array.prototype.sort.js: sort with comparefn failed");
}

function cmpReverse(x, y) {
  return y - x;
};
var a4 = new Array(1, 2, 3);
a4.sort(cmpReverse);
if (a4[0] == 3 && a4[1] == 2 && a4[2] == 1) {
  ok++;
} else {
  console.log("es1.Array.prototype.sort.js: reverse comparefn failed");
}

if (ok == 5) {
  console.log("es1.Array.prototype.sort.js: OK");
} else {
  console.log("es1.Array.prototype.sort.js: FAIL");
}
