// ES5: 15.3.4.5 Function.prototype.bind (thisArg [, arg1 [, arg2, …]])
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
// compat-table: ES5 > Function.prototype.bind (medium)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Function.prototype.bind === 'function') {
  ok++;
} else {
  console.log("es5.Function.prototype.bind.js: Function.prototype.bind not a function");
}

var obj = { x: 42 };
function getX() { return this.x; }
var boundGetX = getX.bind(obj);
if (boundGetX() === 42) {
  ok++;
} else {
  console.log("es5.Function.prototype.bind.js: thisArg binding failed");
}

function add(a, b) { return a + b; }
var add5 = add.bind(null, 5);
if (add5(3) === 8) {
  ok++;
} else {
  console.log("es5.Function.prototype.bind.js: argument binding failed");
}

function sum(a, b, c) { return a + b + c; }
var boundSum = sum.bind(null, 1, 2);
if (boundSum.length === 1) {
  ok++;
} else {
  console.log("es5.Function.prototype.bind.js: length property incorrect");
}

function Ctor(x) { this.value = x; }
var BoundCtor = Ctor.bind(null, 99);
var inst = new BoundCtor();
if (inst.value === 99 && inst instanceof Ctor) {
  ok++;
} else {
  console.log("es5.Function.prototype.bind.js: bound constructor failed");
}

var threw = false;
try {
  Function.prototype.bind.call(null);
} catch (e) {
  if (e instanceof TypeError) {
    threw = true;
  }
}
if (threw) {
  ok++;
} else {
  console.log("es5.Function.prototype.bind.js: non-callable does not throw TypeError");
}

if (ok === 6) {
  console.log("es5.Function.prototype.bind.js: OK");
} else {
  console.log("es5.Function.prototype.bind.js: FAIL");
}
