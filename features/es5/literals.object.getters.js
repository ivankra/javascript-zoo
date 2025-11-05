// ES5: 11.1.5 Object Initialiser
// compat-table: ES5 > Object/array literal extensions (large) > Getter accessors
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var o1 = { get x(){ return 1; } };
if (o1.x === 1) {
  ok++;
} else {
  console.log("es5/literals.object.getters.js: { get x(){ return 1 } }.x failed");
}

var o2 = { get foo(){ return 42; } };
if (o2.foo === 42) {
  ok++;
} else {
  console.log("es5/literals.object.getters.js: getter returning value failed");
}

var counter = 0;
var o3 = { get count(){ return ++counter; } };
if (o3.count === 1 && o3.count === 2) {
  ok++;
} else {
  console.log("es5/literals.object.getters.js: getter with side effects failed");
}

var o4 = {
  _value: 10,
  get value(){ return this._value; }
};
if (o4.value === 10) {
  ok++;
} else {
  console.log("es5/literals.object.getters.js: getter accessing this failed");
}

if (ok === 4) {
  console.log("es5/literals.object.getters.js: OK");
} else {
  console.log("es5/literals.object.getters.js: failed");
}
