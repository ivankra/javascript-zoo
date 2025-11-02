// ES3: 15.3.4.4 Function.prototype.call (thisArg [ , arg1 [ , arg2, … ] ] )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

function sum(a, b) {
  return a + b;
}

var result1 = sum.call(null, 3, 7);
if (result1 == 10) {
  ok++;
} else {
  console.log("es3.Function.prototype.call.js: call with args failed");
}

function getThis() {
  return this;
}

var obj = {value: 42};
var result2 = getThis.call(obj);
if (result2 == obj) {
  ok++;
} else {
  console.log("es3.Function.prototype.call.js: call with thisArg failed");
}

function multiArg(a, b, c) {
  return a + b + c;
}

var result3 = multiArg.call(null, 1, 2, 3);
if (result3 == 6) {
  ok++;
} else {
  console.log("es3.Function.prototype.call.js: call with multiple args failed");
}

function noArgs() {
  return 99;
}

var result4 = noArgs.call(null);
if (result4 == 99) {
  ok++;
} else {
  console.log("es3.Function.prototype.call.js: call with no args failed");
}

function getProp() {
  return this.x;
}

var obj2 = {x: 100};
var result5 = getProp.call(obj2);
if (result5 == 100) {
  ok++;
} else {
  console.log("es3.Function.prototype.call.js: call accessing this property failed");
}

if (ok == 5) {
  console.log("es3.Function.prototype.call.js: OK");
} else {
  console.log("es3.Function.prototype.call.js: FAIL");
}
