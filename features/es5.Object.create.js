// ES5: 15.2.3.5 Object.create ( O [, Properties] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
// compat-table: ES5 > Object static methods (large) > Object.create
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Object.create === 'function') {
  ok++;
} else {
  console.log("es5.Object.create.js: Object.create not a function");
}

var proto = { x: 1 };
var obj = Object.create(proto);
if (obj.x === 1) {
  ok++;
} else {
  console.log("es5.Object.create.js: prototype chain failed");
}

var obj2 = Object.create(null);
if (Object.getPrototypeOf(obj2) === null) {
  ok++;
} else {
  console.log("es5.Object.create.js: null prototype failed");
}

var obj3 = Object.create({}, {
  prop: {
    value: 42,
    writable: true,
    enumerable: true,
    configurable: true
  }
});
if (obj3.prop === 42) {
  ok++;
} else {
  console.log("es5.Object.create.js: Properties argument failed");
}

if (ok === 4) {
  console.log("es5.Object.create.js: OK");
} else {
  console.log("es5.Object.create.js: FAIL");
}
