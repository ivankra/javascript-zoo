// ES1: 10.1.8 Arguments Object
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

// arguments.callee allows anonymous functions to be recursive

function temp(x) {
  if (x == 0) {
    return 1;
  } else {
    return arguments.callee(x-1) * x;
  }
};

var f = temp;
temp = 0;

var res = f(10);
if (res == 3628800) {
  console.log("es1/arguments.callee.js: OK");
} else {
  console.log("es1/arguments.callee.js: failed");
}
