// ES3: 12.6.1 The do-while Statement
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var i = 0;
do {
  i++;
} while (i < 5);
if (i == 5) {
  ok++;
} else {
  console.log("es3/do-while.js: basic do-while failed");
}

var j = 10;
do {
  j++;
} while (j < 5);
if (j == 11) {
  ok++;
} else {
  console.log("es3/do-while.js: do-while executes once when condition false failed");
}

var sum = 0;
var k = 1;
do {
  sum = sum + k;
  k++;
} while (k <= 3);
if (sum == 6) {
  ok++;
} else {
  console.log("es3/do-while.js: do-while accumulation failed");
}

if (ok == 3) {
  console.log("es3/do-while.js: OK");
} else {
  console.log("es3/do-while.js: failed");
}
