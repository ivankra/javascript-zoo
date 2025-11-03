// ES5: 7.6.1 Reserved Words
// compat-table: ES5 > Miscellaneous (medium) > Unreserved words
//
// abstract, boolean, byte, char, double, final, float, goto,
// int, long, native, short, synchronized, transient, volatile
// were FutureReservedWords in ES3, no longer reserved in ES5.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var abstract, boolean, byte, char, double, final, float, goto, int, long,
  native, short, synchronized, transient, volatile;

abstract = 1;
boolean = 2;
byte = 3;
char = 4;
double = 5;
final = 6;
float = 7;
goto = 8;
int = 9;
long = 10;
native = 11;
short = 12;
synchronized = 13;
transient = 14;
volatile = 15;

if (abstract === 1 && volatile === 15) {
  ok++;
} else {
  console.log("es5.source.unreserved-words.js: unreserved words failed");
}

if (ok === 1) {
  console.log("es5.source.unreserved-words.js: OK");
} else {
  console.log("es5.source.unreserved-words.js: FAIL");
}
