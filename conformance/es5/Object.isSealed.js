// ES5: 15.2.3.11 Object.isSealed ( O )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
// compat-table: ES5 > Object static methods (large) > Object.isSealed
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Object.isSealed === 'function') {
  ok++;
} else {
  console.log("es5/Object.isSealed.js: Object.isSealed not a function");
}

var obj = { x: 1 };
if (Object.isSealed(obj) === false) {
  ok++;
} else {
  console.log("es5/Object.isSealed.js: unsealed object failed");
}

var obj2 = { a: 1 };
Object.seal(obj2);
if (Object.isSealed(obj2) === true) {
  ok++;
} else {
  console.log("es5/Object.isSealed.js: sealed object failed");
}

var obj3 = { b: 1 };
Object.freeze(obj3);
if (Object.isSealed(obj3) === true) {
  ok++;
} else {
  console.log("es5/Object.isSealed.js: frozen object is sealed failed");
}

if (ok === 4) {
  console.log("es5/Object.isSealed.js: OK");
} else {
  console.log("es5/Object.isSealed.js: failed");
}
