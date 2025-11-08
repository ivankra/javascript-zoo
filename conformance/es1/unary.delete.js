// ES1: 11.4.1 The delete operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var obj = new Object();
obj.a = 1;
obj.b = 2;

if (obj.a == 1) {
  ok++;
} else {
  console.log("es1/unary.delete.js: property assignment failed");
}

delete obj.a;

if (obj.a == null) {
  ok++;
} else {
  console.log("es1/unary.delete.js: delete failed");
}

if (obj.b == 2) {
  ok++;
} else {
  console.log("es1/unary.delete.js: other property affected");
}

if (ok == 3) {
  console.log("es1/unary.delete.js: OK");
} else {
  console.log("es1/unary.delete.js: failed");
}
