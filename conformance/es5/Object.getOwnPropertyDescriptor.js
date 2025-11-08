// ES5: 15.2.3.3 Object.getOwnPropertyDescriptor ( O, P )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
// compat-table: ES5 > Object static methods (large) > Object.getOwnPropertyDescriptor
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Object.getOwnPropertyDescriptor === 'function') {
  ok++;
} else {
  console.log("es5/Object.getOwnPropertyDescriptor.js: Object.getOwnPropertyDescriptor not a function");
}

var obj = { x: 1 };
var desc = Object.getOwnPropertyDescriptor(obj, 'x');
if (desc.value === 1 && desc.writable === true && desc.enumerable === true && desc.configurable === true) {
  ok++;
} else {
  console.log("es5/Object.getOwnPropertyDescriptor.js: basic descriptor failed");
}

var obj2 = {};
Object.defineProperty(obj2, 'y', { value: 42, writable: false });
var desc2 = Object.getOwnPropertyDescriptor(obj2, 'y');
if (desc2.value === 42 && desc2.writable === false) {
  ok++;
} else {
  console.log("es5/Object.getOwnPropertyDescriptor.js: non-writable descriptor failed");
}

var obj3 = Object.create({ inherited: 1 });
if (Object.getOwnPropertyDescriptor(obj3, 'inherited') === undefined) {
  ok++;
} else {
  console.log("es5/Object.getOwnPropertyDescriptor.js: inherited property failed");
}

if (ok === 4) {
  console.log("es5/Object.getOwnPropertyDescriptor.js: OK");
} else {
  console.log("es5/Object.getOwnPropertyDescriptor.js: failed");
}
