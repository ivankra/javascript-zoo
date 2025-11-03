// ES5: 15.2.3.6 Object.defineProperty ( O, P, Attributes )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
// compat-table: ES5 > Object static methods (large) > Object.defineProperty
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Object.defineProperty === 'function') {
  ok++;
} else {
  console.log("es5.Object.defineProperty.js: Object.defineProperty not a function");
}

var obj = {};
Object.defineProperty(obj, 'x', { value: 42 });
if (obj.x === 42) {
  ok++;
} else {
  console.log("es5.Object.defineProperty.js: basic property definition failed");
}

var obj2 = {};
Object.defineProperty(obj2, 'y', { value: 10, writable: false });
obj2.y = 20;
if (obj2.y === 10) {
  ok++;
} else {
  console.log("es5.Object.defineProperty.js: non-writable property failed");
}

var obj3 = {};
Object.defineProperty(obj3, 'z', {
  get: function() { return 5; }
});
if (obj3.z === 5) {
  ok++;
} else {
  console.log("es5.Object.defineProperty.js: getter definition failed");
}

if (ok === 4) {
  console.log("es5.Object.defineProperty.js: OK");
} else {
  console.log("es5.Object.defineProperty.js: FAIL");
}
