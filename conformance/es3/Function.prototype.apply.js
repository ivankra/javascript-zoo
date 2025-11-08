// ES3: 15.3.4.3 Function.prototype.apply (thisArg, argArray)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

function sum(a, b) {
  return a + b;
}

var result1 = sum.apply(null, [3, 7]);
if (result1 == 10) {
  ok++;
} else {
  console.log("es3/Function.prototype.apply.js: apply with array failed");
}

function getThis() {
  return this;
}

var obj = {value: 42};
var result2 = getThis.apply(obj);
if (result2 == obj) {
  ok++;
} else {
  console.log("es3/Function.prototype.apply.js: apply with thisArg failed");
}

function multiArg(a, b, c) {
  return a + b + c;
}

var result3 = multiArg.apply(null, [1, 2, 3]);
if (result3 == 6) {
  ok++;
} else {
  console.log("es3/Function.prototype.apply.js: apply with multiple args failed");
}

function noArgs() {
  return 99;
}

var result4 = noArgs.apply(null);
if (result4 == 99) {
  ok++;
} else {
  console.log("es3/Function.prototype.apply.js: apply with no argArray failed");
}

function useArguments() {
  function inner() {
    return arguments[0] + arguments[1];
  }
  return inner.apply(null, arguments);
}

var result5 = useArguments(10, 20);
if (result5 == 30) {
  ok++;
} else {
  console.log("es3/Function.prototype.apply.js: apply with arguments object failed");
}

if (ok == 5) {
  console.log("es3/Function.prototype.apply.js: OK");
} else {
  console.log("es3/Function.prototype.apply.js: failed");
}
