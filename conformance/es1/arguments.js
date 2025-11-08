// ES1: 10.1.8 Arguments Object
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok, i;
ok = 0;

function f() {
  return arguments[1] * 42;
}
i = f(1, 2);
if (i == 84) {
  ok++;
} else {
  console.log("es1/arguments.js: arguments[i] not available");
}

function g() {
  return arguments.length * 42;
}
i = g(1, 2, 3, 4);
if (i == 168) {
  ok++;
} else {
  console.log("es1/arguments.js: arguments.length not available");
}

if (ok == 2) {
  console.log("es1/arguments.js: OK");
} else {
  console.log("es1/arguments.js: failed");
}
