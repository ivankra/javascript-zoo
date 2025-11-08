// ES5: 15.9.4.4 Date.now ( )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
// compat-table: ES5 > Date methods (small) > Date.now
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Date.now === 'function') {
  ok++;
} else {
  console.log("es5/Date.now.js: Date.now not a function");
}

var now1 = Date.now();
if (typeof now1 === 'number') {
  ok++;
} else {
  console.log("es5/Date.now.js: Date.now() does not return a number");
}

var now2 = Date.now();
if (now2 >= now1) {
  ok++;
} else {
  console.log("es5/Date.now.js: Date.now() does not increase monotonically");
}

var d = new Date();
var now3 = Date.now();
if (Math.abs(now3 - d.getTime()) < 100) {
  ok++;
} else {
  console.log("es5/Date.now.js: Date.now() does not match new Date().getTime()");
}

if (ok === 4) {
  console.log("es5/Date.now.js: OK");
} else {
  console.log("es5/Date.now.js: failed");
}
