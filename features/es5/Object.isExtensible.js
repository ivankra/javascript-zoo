// ES5: 15.2.3.13 Object.isExtensible ( O )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
// compat-table: ES5 > Object static methods (large) > Object.isExtensible
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Object.isExtensible === 'function') {
  ok++;
} else {
  console.log("es5/Object.isExtensible.js: Object.isExtensible not a function");
}

var obj = { x: 1 };
if (Object.isExtensible(obj) === true) {
  ok++;
} else {
  console.log("es5/Object.isExtensible.js: extensible object failed");
}

var obj2 = { a: 1 };
Object.preventExtensions(obj2);
if (Object.isExtensible(obj2) === false) {
  ok++;
} else {
  console.log("es5/Object.isExtensible.js: non-extensible object failed");
}

var obj3 = { b: 1 };
Object.freeze(obj3);
if (Object.isExtensible(obj3) === false) {
  ok++;
} else {
  console.log("es5/Object.isExtensible.js: frozen object not extensible failed");
}

if (ok === 4) {
  console.log("es5/Object.isExtensible.js: OK");
} else {
  console.log("es5/Object.isExtensible.js: failed");
}
