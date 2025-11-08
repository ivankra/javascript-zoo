// ES3: 11.1.5 Object Initialiser
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var o1 = {};
if (typeof o1 == "object") {
  ok++;
} else {
  console.log("es3/literals.object.js: empty object literal failed");
}

var o2 = {foo: 1, bar: 2};
if (o2.foo == 1 && o2.bar == 2) {
  ok++;
} else {
  console.log("es3/literals.object.js: object literal with properties failed");
}

var x = 10;
var o3 = {a: x + 5, b: x * 2};
if (o3.a == 15 && o3.b == 20) {
  ok++;
} else {
  console.log("es3/literals.object.js: object literal with expressions failed");
}

var o4 = {prop1: 1, prop2: 2, prop3: 3};
if (o4.prop1 == 1 && o4.prop2 == 2 && o4.prop3 == 3) {
  ok++;
} else {
  console.log("es3/literals.object.js: object literal with multiple properties failed");
}

if (ok == 4) {
  console.log("es3/literals.object.js: OK");
} else {
  console.log("es3/literals.object.js: failed");
}
