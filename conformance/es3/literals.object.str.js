// ES3: 11.1.5 Object Initialiser
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var o1 = {"test": 42};
if (o1.test == 42) {
  ok++;
} else {
  console.log("es3/literals.object.str.js: double quoted property name failed");
}

var o2 = {'foo': 99};
if (o2.foo == 99) {
  ok++;
} else {
  console.log("es3/literals.object.str.js: single quoted property name failed");
}

var o3 = {"a": 1, 'b': 2};
if (o3.a == 1 && o3.b == 2) {
  ok++;
} else {
  console.log("es3/literals.object.str.js: mixed quoted property names failed");
}

var o4 = {"with space": 123};
if (o4["with space"] == 123) {
  ok++;
} else {
  console.log("es3/literals.object.str.js: quoted property name with space failed");
}

if (ok == 4) {
  console.log("es3/literals.object.str.js: OK");
} else {
  console.log("es3/literals.object.str.js: failed");
}
