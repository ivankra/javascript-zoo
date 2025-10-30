// Standard: ES1 11.4.3 The typeof operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = null;
var b = typeof a;
if (b == "object") {
  ok += 1;
} else {
  console.log("es1.typeof.all.js: typeof null != 'object'");
}

a = true;
b = typeof a;
if (b == "boolean") {
  ok += 1;
} else {
  console.log("es1.typeof.all.js: typeof true != 'boolean'");
}

a = 0;
b = typeof a;
if (b == "number") {
  ok += 1;
} else {
  console.log("es1.typeof.all.js: typeof 0 != 'number'");
}

a = "";
b = typeof a;
if (b == "string") {
  ok += 1;
} else {
  console.log("es1.typeof.all.js: typeof '' != 'string'");
}

a = new Object();
b = typeof a;
if (b == "object") {
  ok += 1;
} else {
  console.log("es1.typeof.all.js: typeof new Object() != 'object'");
}

a = parseInt;
b = typeof a;
if (b == "function") {
  ok += 1;
} else {
  console.log("es1.typeof.all.js: typeof parseInt != 'function'");
}

var x;
b = typeof x;
if (b == "undefined") {
  ok += 1;
} else {
  console.log("es1.typeof.all.js: typeof <undefined> != 'undefined'");
}

if (ok == 7) {
  console.log("es1.typeof.all.js: OK");
}
