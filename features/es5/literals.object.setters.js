// ES5: 11.1.5 Object Initialiser
// compat-table: ES5 > Object/array literal extensions (large) > Setter accessors
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var value = 0;
var o1 = { set x(v){ value = v; } };
o1.x = 1;
if (value === 1) {
  ok++;
} else {
  console.log("es5/literals.object.setters.js: { set x(v){ value = v; } }.x failed");
}

var result = 0;
var o2 = { set foo(v){ result = v * 2; } };
o2.foo = 5;
if (result === 10) {
  ok++;
} else {
  console.log("es5/literals.object.setters.js: setter with computation failed");
}

var o3 = {
  _value: 0,
  set value(v){ this._value = v; }
};
o3.value = 42;
if (o3._value === 42) {
  ok++;
} else {
  console.log("es5/literals.object.setters.js: setter accessing this failed");
}

if (ok === 3) {
  console.log("es5/literals.object.setters.js: OK");
} else {
  console.log("es5/literals.object.setters.js: failed");
}
