// ES3: 11.1.5 Object Initialiser
// ES3: 7.6 Identifiers
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var o1 = {ж: 42};
if (o1.ж == 42) {
  ok++;
} else {
  console.log("es3/literals.object.unicode.js: cyrillic property name failed");
}

var o2 = {\u0041: 99};
if (o2.A == 99) {
  ok++;
} else {
  console.log("es3/literals.object.unicode.js: \\u0041 property name failed");
}

var o3 = {ν: 1, ä: 2};
if (o3.ν == 1 && o3.ä == 2) {
  ok++;
} else {
  console.log("es3/literals.object.unicode.js: greek and german property names failed");
}

var o4 = {$: 10, _: 20};
if (o4.$ == 10 && o4._ == 20) {
  ok++;
} else {
  console.log("es3/literals.object.unicode.js: $ and _ property names failed");
}

if (ok == 4) {
  console.log("es3/literals.object.unicode.js: OK");
} else {
  console.log("es3/literals.object.unicode.js: failed");
}
