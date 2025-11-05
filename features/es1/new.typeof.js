// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = new String('x');
if (typeof a == 'object') {
  ok++;
} else {
  console.log("es1/new.typeof.js: typeof new String('x') != 'object'");
}

var b = String('x');
if (typeof b == 'string') {
  ok++;
} else {
  console.log("es1/new.typeof.js: typeof String('x') != 'string'");
}

function f() {};
if (typeof f == 'function') {
  ok++;
} else {
  console.log("es1/new.typeof.js: typeof f != 'function'");
}

a = new f();
if (typeof a == 'object') {
  ok++;
} else {
  console.log("es1/new.typeof.js: typeof new f() != 'object'");
}

if (ok == 4) {
  console.log("es1/new.typeof.js: OK");
} else {
  console.log("es1/new.typeof.js: failed");
}
