// ES5: 15.2.3.14 Object.keys ( O )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
// compat-table: ES5 > Object static methods (large) > Object.keys
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Object.keys === 'function') {
  ok++;
} else {
  console.log("es5.Object.keys.js: Object.keys not a function");
}

var obj = { a: 1, b: 2, c: 3 };
var keys = Object.keys(obj);
if (keys.length === 3 && keys[0] === 'a' && keys[1] === 'b' && keys[2] === 'c') {
  ok++;
} else {
  console.log("es5.Object.keys.js: basic keys failed");
}

var obj2 = {};
if (Object.keys(obj2).length === 0) {
  ok++;
} else {
  console.log("es5.Object.keys.js: empty object failed");
}

var obj3 = Object.create({ inherited: 1 });
obj3.own = 2;
var keys3 = Object.keys(obj3);
if (keys3.length === 1 && keys3[0] === 'own') {
  ok++;
} else {
  console.log("es5.Object.keys.js: only own properties failed");
}

var obj4 = {};
Object.defineProperty(obj4, 'nonenumerable', { value: 1, enumerable: false });
obj4.enumerable = 2;
var keys4 = Object.keys(obj4);
if (keys4.length === 1 && keys4[0] === 'enumerable') {
  ok++;
} else {
  console.log("es5.Object.keys.js: only enumerable properties failed");
}

if (ok === 5) {
  console.log("es5.Object.keys.js: OK");
} else {
  console.log("es5.Object.keys.js: FAIL");
}
