// ES3: 12.8 The break Statement
// ES3: 12.12 Labelled Statements
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var x = 0;
loop1: while (x < 10) {
  x++;
  if (x == 5) {
    break loop1;
  }
}
if (x == 5) {
  ok++;
} else {
  console.log("es3/labelled.break.js: labelled break in while failed");
}

var sum = 0;
outer: for (var i = 0; i < 5; i++) {
  for (var j = 0; j < 5; j++) {
    sum = sum + 1;
    if (i == 2 && j == 2) {
      break outer;
    }
  }
}
if (sum == 13) {
  ok++;
} else {
  console.log("es3/labelled.break.js: labelled break to outer loop failed");
}

var y = 0;
block: {
  y = 1;
  if (y == 1) {
    break block;
  }
  y = 2;
}
if (y == 1) {
  ok++;
} else {
  console.log("es3/labelled.break.js: labelled break from block failed");
}

if (ok == 3) {
  console.log("es3/labelled.break.js: OK");
} else {
  console.log("es3/labelled.break.js: failed");
}
