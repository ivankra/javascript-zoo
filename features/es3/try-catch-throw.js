// ES3: 12.13 The throw statement
// ES3: 12.14 The try statement
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var caught1 = 0;
try {
  throw 42;
} catch (e) {
  caught1 = e;
}
if (caught1 == 42) {
  ok++;
} else {
  console.log("es3/try-catch-throw.js: basic throw/catch failed");
}

var caught2 = 0;
try {
  throw "error";
} catch (e) {
  caught2 = e;
}
if (caught2 == "error") {
  ok++;
} else {
  console.log("es3/try-catch-throw.js: throw string failed");
}

var noException = 0;
try {
  noException = 7;
} catch (e) {
  noException = 999;
}
if (noException == 7) {
  ok++;
} else {
  console.log("es3/try-catch-throw.js: try without exception failed");
}

var caught3 = 0;
var x = 0;
try {
  x = 1;
  throw 100;
  x = 2;
} catch (e) {
  caught3 = e;
}
if (caught3 == 100 && x == 1) {
  ok++;
} else {
  console.log("es3/try-catch-throw.js: throw stops execution failed");
}

if (ok == 4) {
  console.log("es3/try-catch-throw.js: OK");
} else {
  console.log("es3/try-catch-throw.js: failed");
}
