// ES3: 13 Function Definition
// ES3: 13.2 Creating Function Objects
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

function outer1() {
  function inner() {
    return 42;
  }
  return inner();
}
if (outer1() == 42) {
  ok++;
} else {
  console.log("es3.nested-functions.js: basic nested function failed");
}

function outer2() {
  function inner(x) {
    return x * x;
  }
  return inner;
}
var f = outer2();
if (f(5) == 25) {
  ok++;
} else {
  console.log("es3.nested-functions.js: return nested function failed");
}

function makeCounter() {
  var count = 0;
  function increment() {
    count++;
    return count;
  }
  return increment;
}
var counter = makeCounter();
if (counter() == 1 && counter() == 2) {
  ok++;
} else {
  console.log("es3.nested-functions.js: closure with nested function failed");
}

function outer3(x) {
  function inner(y) {
    return x + y;
  }
  return inner;
}
var add5 = outer3(5);
if (add5(3) == 8) {
  ok++;
} else {
  console.log("es3.nested-functions.js: nested function closure over parameter failed");
}

if (ok == 4) {
  console.log("es3.nested-functions.js: OK");
} else {
  console.log("es3.nested-functions.js: FAIL");
}
