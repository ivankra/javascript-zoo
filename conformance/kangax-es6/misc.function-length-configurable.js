// compat-table: ES6 > misc > miscellaneous (small) > function 'length' is configurable
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-additions-and-changes-that-introduce-incompatibilities-with-prior-editions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var fn = function(a, b) {};

  var desc = Object.getOwnPropertyDescriptor(fn, "length");
  if (desc.configurable) {
    Object.defineProperty(fn, "length", { value: 1 });
    return fn.length === 1;
  }

  return false;
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.function-length-configurable.js: OK");
  } else {
    console.log("kangax-es6/misc.function-length-configurable.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.function-length-configurable.js: exception: " + e);
}
