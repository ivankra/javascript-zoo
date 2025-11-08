// ES5: 15.2.3.8 Object.seal ( O )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal
// compat-table: ES5 > Object static methods (large) > Object.seal
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Object.seal === 'function') {
  ok++;
} else {
  console.log("es5/Object.seal.js: Object.seal not a function");
}

var obj = { x: 1 };
Object.seal(obj);
obj.y = 2;
if (obj.y === undefined) {
  ok++;
} else {
  console.log("es5/Object.seal.js: prevented property addition failed");
}

var obj2 = { a: 1 };
Object.seal(obj2);
obj2.a = 2;
if (obj2.a === 2) {
  ok++;
} else {
  console.log("es5/Object.seal.js: existing property modification failed");
}

var obj3 = { b: 1 };
Object.seal(obj3);
delete obj3.b;
if (obj3.b === 1) {
  ok++;
} else {
  console.log("es5/Object.seal.js: prevented property deletion failed");
}

if (ok === 4) {
  console.log("es5/Object.seal.js: OK");
} else {
  console.log("es5/Object.seal.js: failed");
}
