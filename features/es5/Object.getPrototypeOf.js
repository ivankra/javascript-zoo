// ES5: 15.2.3.2 Object.getPrototypeOf ( O )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
// compat-table: ES5 > Object static methods (large) > Object.getPrototypeOf
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Object.getPrototypeOf === 'function') {
  ok++;
} else {
  console.log("es5/Object.getPrototypeOf.js: Object.getPrototypeOf not a function");
}

var proto = { x: 1 };
var obj = Object.create(proto);
if (Object.getPrototypeOf(obj) === proto) {
  ok++;
} else {
  console.log("es5/Object.getPrototypeOf.js: custom prototype failed");
}

var arr = [];
if (Object.getPrototypeOf(arr) === Array.prototype) {
  ok++;
} else {
  console.log("es5/Object.getPrototypeOf.js: Array.prototype failed");
}

var obj2 = {};
if (Object.getPrototypeOf(obj2) === Object.prototype) {
  ok++;
} else {
  console.log("es5/Object.getPrototypeOf.js: Object.prototype failed");
}

if (ok === 4) {
  console.log("es5/Object.getPrototypeOf.js: OK");
} else {
  console.log("es5/Object.getPrototypeOf.js: failed");
}
