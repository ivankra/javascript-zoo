// ES1: 15.4.5.1 [[Put]](P, V)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

// 15.4.5.1 [[Put]](P, V) - setting array index updates length
var a1 = new Array();
a1[0] = "a";
a1[1] = "b";
a1[2] = "c";
if (a1.length == 3) {
  ok++;
} else {
  console.log("es1/Array.length.assignment.js: array index length update failed");
}

// 15.4.5.1 [[Put]](P, V) - setting length deletes properties
var a2 = new Array(1, 2, 3, 4, 5);
a2.length = 3;
if (a2.length == 3 && a2[0] == 1 && a2[1] == 2 && a2[2] == 3) {
  ok++;
} else {
  console.log("es1/Array.length.assignment.js: length truncation failed");
}

if (ok == 2) {
  console.log("es1/Array.length.assignment.js: OK");
} else {
  console.log("es1/Array.length.assignment.js: failed");
}
