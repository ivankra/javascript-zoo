// ES3: 12.7 The continue Statement
// ES3: 12.12 Labelled Statements
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var sum1 = 0;
var i = 0;
loop1: while (i < 5) {
  i++;
  if (i == 3) {
    continue loop1;
  }
  sum1 = sum1 + i;
}
if (sum1 == 12) {
  ok++;
} else {
  console.log("es3.labelled.continue.js: labelled continue in while failed");
}

var sum2 = 0;
outer: for (var j = 0; j < 3; j++) {
  for (var k = 0; k < 3; k++) {
    if (k == 1) {
      continue outer;
    }
    sum2 = sum2 + 1;
  }
}
if (sum2 == 3) {
  ok++;
} else {
  console.log("es3.labelled.continue.js: labelled continue to outer loop failed");
}

if (ok == 2) {
  console.log("es3.labelled.continue.js: OK");
} else {
  console.log("es3.labelled.continue.js: FAIL");
}
