// ES3: 11.1.4 Array Initialiser
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = [];
if (a1.length == 0) {
  ok++;
} else {
  console.log("es3.literals.array.js: empty array literal failed");
}

var a2 = [1, 2, 3];
if (a2.length == 3 && a2[0] == 1 && a2[1] == 2 && a2[2] == 3) {
  ok++;
} else {
  console.log("es3.literals.array.js: array literal with elements failed");
}

var x = 10;
var a3 = [x + 1, x * 2];
if (a3.length == 2 && a3[0] == 11 && a3[1] == 20) {
  ok++;
} else {
  console.log("es3.literals.array.js: array literal with expressions failed");
}

if (ok == 3) {
  console.log("es3.literals.array.js: OK");
} else {
  console.log("es3.literals.array.js: FAIL");
}
