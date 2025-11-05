// ES5: 15.2.3.12 Object.isFrozen ( O )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
// compat-table: ES5 > Object static methods (large) > Object.isFrozen
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Object.isFrozen === 'function') {
  ok++;
} else {
  console.log("es5/Object.isFrozen.js: Object.isFrozen not a function");
}

var obj = { x: 1 };
if (Object.isFrozen(obj) === false) {
  ok++;
} else {
  console.log("es5/Object.isFrozen.js: unfrozen object failed");
}

var obj2 = { a: 1 };
Object.freeze(obj2);
if (Object.isFrozen(obj2) === true) {
  ok++;
} else {
  console.log("es5/Object.isFrozen.js: frozen object failed");
}

var obj3 = { b: 1 };
Object.seal(obj3);
if (Object.isFrozen(obj3) === false) {
  ok++;
} else {
  console.log("es5/Object.isFrozen.js: sealed object not frozen failed");
}

if (ok === 4) {
  console.log("es5/Object.isFrozen.js: OK");
} else {
  console.log("es5/Object.isFrozen.js: failed");
}
