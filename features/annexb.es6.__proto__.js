// ES6: B.2.2.1 Object.prototype.__proto__
// ES6: B.2.2.1.1 get Object.prototype.__proto__
// ES6: B.2.2.1.2 set Object.prototype.__proto__
// ES6: B.3.1 __proto__ Property Names in Object Initializers
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var proto = { x: 1 };
var obj = {};
obj.__proto__ = proto;
if (obj.x == 1) {
  ok++;
} else {
  console.log("annexb.es6.__proto__.js: set __proto__ failed");
}

var obj2 = {};
if (obj2.__proto__ === Object.prototype) {
  ok++;
} else {
  console.log("annexb.es6.__proto__.js: get __proto__ failed");
}

var proto2 = { y: 2 };
var obj3 = { __proto__: proto2 };
if (obj3.y == 2) {
  ok++;
} else {
  console.log("annexb.es6.__proto__.js: object initializer failed");
}

if (ok == 3) {
  console.log("annexb.es6.__proto__.js: OK");
} else {
  console.log("annexb.es6.__proto__.js: FAIL");
}
