// ES3: 11.1.4 Array Initialiser
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = [1, , 3];
if (a1.length == 3 && a1[0] == 1 && a1[2] == 3) {
  ok++;
} else {
  console.log("es3.literals.array.elisions.js: array with single elision failed");
}

var a2 = [, , 5];
if (a2.length == 3 && a2[2] == 5) {
  ok++;
} else {
  console.log("es3.literals.array.elisions.js: array with leading elisions failed");
}

var a3 = [1, , , 4];
if (a3.length == 4 && a3[0] == 1 && a3[3] == 4) {
  ok++;
} else {
  console.log("es3.literals.array.elisions.js: array with multiple elisions failed");
}

var a4 = [, ];
if (a4.length == 1) {
  ok++;
} else {
  console.log("es3.literals.array.elisions.js: array with only elision failed");
}

if (ok == 4) {
  console.log("es3.literals.array.elisions.js: OK");
} else {
  console.log("es3.literals.array.elisions.js: FAIL");
}
