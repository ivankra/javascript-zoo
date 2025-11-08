// ES3: 11.1.4 Array Initialiser
// compat-table: ES5 > Object/array literal extensions (large) > Trailing commas in array literals
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a1 = [1, ];
if (a1.length == 1) {
  ok++;
} else {
  console.log("es3/literals.array.trailing-comma.js: [1,].length failed");
}

var a2 = [1, 2, ];
if (a2.length == 2 && a2[0] == 1 && a2[1] == 2) {
  ok++;
} else {
  console.log("es3/literals.array.trailing-comma.js: trailing comma failed");
}

var a3 = [1, 2, 3, ];
if (a3.length == 3 && a3[0] == 1 && a3[1] == 2 && a3[2] == 3) {
  ok++;
} else {
  console.log("es3/literals.array.trailing-comma.js: multiple elements with trailing comma failed");
}

if (ok == 3) {
  console.log("es3/literals.array.trailing-comma.js: OK");
} else {
  console.log("es3/literals.array.trailing-comma.js: failed");
}
