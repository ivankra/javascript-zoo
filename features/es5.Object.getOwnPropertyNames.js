// ES5: 15.2.3.4 Object.getOwnPropertyNames ( O )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
// compat-table: ES5 > Object static methods (large) > Object.getOwnPropertyNames
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Object.getOwnPropertyNames === 'function') {
  ok++;
} else {
  console.log("es5.Object.getOwnPropertyNames.js: Object.getOwnPropertyNames not a function");
}

var obj = { a: 1, b: 2 };
var names = Object.getOwnPropertyNames(obj);
if (names.length === 2 && names[0] === 'a' && names[1] === 'b') {
  ok++;
} else {
  console.log("es5.Object.getOwnPropertyNames.js: basic property names failed");
}

var obj2 = {};
Object.defineProperty(obj2, 'x', { value: 1, enumerable: false });
var names2 = Object.getOwnPropertyNames(obj2);
if (names2.length === 1 && names2[0] === 'x') {
  ok++;
} else {
  console.log("es5.Object.getOwnPropertyNames.js: non-enumerable property failed");
}

var obj3 = Object.create({ inherited: 1 });
obj3.own = 2;
var names3 = Object.getOwnPropertyNames(obj3);
if (names3.length === 1 && names3[0] === 'own') {
  ok++;
} else {
  console.log("es5.Object.getOwnPropertyNames.js: only own properties failed");
}

if (ok === 4) {
  console.log("es5.Object.getOwnPropertyNames.js: OK");
} else {
  console.log("es5.Object.getOwnPropertyNames.js: FAIL");
}
