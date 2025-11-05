// compat-table: ES6 > misc > miscellaneous (small) > accessors aren't constructors
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-additions-and-changes-that-introduce-incompatibilities-with-prior-editions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var f = (Object.getOwnPropertyDescriptor({get a(){}}, 'a')).get;
  try {
    new f;
  } catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.accessors-no-constructor.js: OK");
  } else {
    console.log("kangax-es6/misc.accessors-no-constructor.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.accessors-no-constructor.js: exception: " + e);
}
