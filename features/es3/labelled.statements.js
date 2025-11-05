// ES3: 12.12 Labelled Statements
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var x = 0;
label1: x = 5;
if (x == 5) {
  ok++;
} else {
  console.log("es3/labelled.statements.js: basic label failed");
}

var y = 0;
label2: {
  y = 10;
}
if (y == 10) {
  ok++;
} else {
  console.log("es3/labelled.statements.js: labelled block failed");
}

var z = 0;
outer: {
  z = 1;
  inner: {
    z = z + 2;
  }
  z = z + 3;
}
if (z == 6) {
  ok++;
} else {
  console.log("es3/labelled.statements.js: nested labelled blocks failed");
}

if (ok == 3) {
  console.log("es3/labelled.statements.js: OK");
} else {
  console.log("es3/labelled.statements.js: failed");
}
