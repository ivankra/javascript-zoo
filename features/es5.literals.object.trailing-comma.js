// ES5: 11.1.5 Object Initialiser
// compat-table: ES5 > Object/array literal extensions (large) > Trailing commas in object literals
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var o1 = { a: true, };
if (o1.a === true) {
  ok++;
} else {
  console.log("es5.literals.object.trailing-comma.js: { a: true, }.a failed");
}

var o2 = { x: 1, y: 2, };
if (o2.x === 1 && o2.y === 2) {
  ok++;
} else {
  console.log("es5.literals.object.trailing-comma.js: multiple properties with trailing comma failed");
}

var o3 = { foo: "bar", };
if (o3.foo === "bar") {
  ok++;
} else {
  console.log("es5.literals.object.trailing-comma.js: single property with trailing comma failed");
}

if (ok === 3) {
  console.log("es5.literals.object.trailing-comma.js: OK");
} else {
  console.log("es5.literals.object.trailing-comma.js: FAIL");
}
