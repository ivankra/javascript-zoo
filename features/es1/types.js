// ES1: 11.4.3 The typeof operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = null;
var b = typeof a;
if (b == "object") {
  ok++;
} else {
  console.log("es1/types.js: typeof null != 'object'");
}

a = false;
b = typeof a;
if (b == "boolean") {
  ok++;
} else {
  console.log("es1/types.js: typeof true != 'boolean'");
}

a = true;
b = typeof a;
if (b == "boolean") {
  ok++;
} else {
  console.log("es1/types.js: typeof true != 'boolean'");
}

a = 0;
b = typeof a;
if (b == "number") {
  ok++;
} else {
  console.log("es1/types.js: typeof 0 != 'number'");
}

a = 0.5;
b = typeof a;
if (b == "number") {
  ok++;
} else {
  console.log("es1/types.js: typeof 0.5 != 'number'");
}

a = "";
b = typeof a;
if (b == "string") {
  ok++;
} else {
  console.log("es1/types.js: typeof '' != 'string'");
}

a = new Object();
b = typeof a;
if (b == "object") {
  ok++;
} else {
  console.log("es1/types.js: typeof new Object() != 'object'");
}

a = console.log;
b = typeof a;
if (b == "function") {
  ok++;
} else {
  console.log("es1/types.js: typeof parseInt != 'function'");
}

var x;
b = typeof x;
if (b == "undefined") {
  ok++;
} else {
  console.log("es1/types.js: typeof <undefined> != 'undefined'");
}

if (ok == 9) {
  console.log("es1/types.js: OK");
} else {
  console.log("es1/types.js: failed");
}
