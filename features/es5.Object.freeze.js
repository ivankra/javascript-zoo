// ES5: 15.2.3.9 Object.freeze ( O )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// compat-table: ES5 > Object static methods (large) > Object.freeze
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Object.freeze === 'function') {
  ok++;
} else {
  console.log("es5.Object.freeze.js: Object.freeze not a function");
}

var obj = { x: 1 };
Object.freeze(obj);
obj.x = 2;
if (obj.x === 1) {
  ok++;
} else {
  console.log("es5.Object.freeze.js: prevented modification failed");
}

var obj2 = { a: 1 };
Object.freeze(obj2);
obj2.b = 2;
if (obj2.b === undefined) {
  ok++;
} else {
  console.log("es5.Object.freeze.js: prevented addition failed");
}

var obj3 = { c: 1 };
Object.freeze(obj3);
delete obj3.c;
if (obj3.c === 1) {
  ok++;
} else {
  console.log("es5.Object.freeze.js: prevented deletion failed");
}

if (ok === 4) {
  console.log("es5.Object.freeze.js: OK");
} else {
  console.log("es5.Object.freeze.js: FAIL");
}
