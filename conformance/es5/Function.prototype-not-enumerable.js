// ES5: 15.3.5.2 prototype
// compat-table: ES5 > Miscellaneous (medium) > Function "prototype" property is non-enumerable
//
// prototype property is non-enumerable in ES5, was enumerable in ES3.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (!Function().propertyIsEnumerable('prototype')) {
  ok++;
} else {
  console.log("es5/Function.prototype-not-enumerable.js: prototype is enumerable");
}

var f = function() {};
if (!f.propertyIsEnumerable('prototype')) {
  ok++;
} else {
  console.log("es5/Function.prototype-not-enumerable.js: named function prototype is enumerable");
}

var enumCount = 0;
for (var key in function() {}) {
  if (key === 'prototype') {
    enumCount++;
  }
}
if (enumCount === 0) {
  ok++;
} else {
  console.log("es5/Function.prototype-not-enumerable.js: prototype appears in for-in");
}

if (ok === 3) {
  console.log("es5/Function.prototype-not-enumerable.js: OK");
} else {
  console.log("es5/Function.prototype-not-enumerable.js: failed");
}
