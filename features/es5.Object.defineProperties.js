// ES5: 15.2.3.7 Object.defineProperties ( O, Properties )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
// compat-table: ES5 > Object static methods (large) > Object.defineProperties
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Object.defineProperties === 'function') {
  ok++;
} else {
  console.log("es5.Object.defineProperties.js: Object.defineProperties not a function");
}

var obj = {};
Object.defineProperties(obj, {
  x: { value: 1, enumerable: true },
  y: { value: 2, enumerable: true }
});
if (obj.x === 1 && obj.y === 2) {
  ok++;
} else {
  console.log("es5.Object.defineProperties.js: multiple properties failed");
}

var obj2 = {};
Object.defineProperties(obj2, {
  a: { value: 10, writable: false },
  b: { value: 20, writable: true }
});
obj2.a = 99;
obj2.b = 30;
if (obj2.a === 10 && obj2.b === 30) {
  ok++;
} else {
  console.log("es5.Object.defineProperties.js: writable attributes failed");
}

if (ok === 3) {
  console.log("es5.Object.defineProperties.js: OK");
} else {
  console.log("es5.Object.defineProperties.js: FAIL");
}
