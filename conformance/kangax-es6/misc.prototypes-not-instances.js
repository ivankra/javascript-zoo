// compat-table: ES6 > misc > miscellaneous (small) > built-in prototypes are not instances
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-additions-and-changes-that-introduce-incompatibilities-with-prior-editions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    RegExp.prototype.exec(); return false;
  } catch(e) {}
  try {
    Date.prototype.valueOf(); return false;
  } catch(e) {}

  if (![Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError].every(function (E) {
      return Object.prototype.toString.call(E.prototype) === '[object Object]';
  })) {
    return false;
  }

  return true;
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.prototypes-not-instances.js: OK");
  } else {
    console.log("kangax-es6/misc.prototypes-not-instances.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.prototypes-not-instances.js: exception: " + e);
}
