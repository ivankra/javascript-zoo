// ES5: 15.2.3.10 Object.preventExtensions ( O )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions
// compat-table: ES5 > Object static methods (large) > Object.preventExtensions
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Object.preventExtensions === 'function') {
  ok++;
} else {
  console.log("es5.Object.preventExtensions.js: Object.preventExtensions not a function");
}

var obj = { x: 1 };
Object.preventExtensions(obj);
obj.y = 2;
if (obj.y === undefined) {
  ok++;
} else {
  console.log("es5.Object.preventExtensions.js: prevented addition failed");
}

var obj2 = { a: 1 };
Object.preventExtensions(obj2);
obj2.a = 2;
if (obj2.a === 2) {
  ok++;
} else {
  console.log("es5.Object.preventExtensions.js: existing property modification failed");
}

var obj3 = { b: 1 };
Object.preventExtensions(obj3);
delete obj3.b;
if (obj3.b === undefined) {
  ok++;
} else {
  console.log("es5.Object.preventExtensions.js: deletion allowed failed");
}

if (ok === 4) {
  console.log("es5.Object.preventExtensions.js: OK");
} else {
  console.log("es5.Object.preventExtensions.js: FAIL");
}
