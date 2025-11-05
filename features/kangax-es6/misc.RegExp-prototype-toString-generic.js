// compat-table: ES6 > misc > miscellaneous (small) > RegExp.prototype.toString generic and uses "flags" property
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-additions-and-changes-that-introduce-incompatibilities-with-prior-editions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return RegExp.prototype.toString.call({source: 'foo', flags: 'bar'}) === '/foo/bar';
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.RegExp-prototype-toString-generic.js: OK");
  } else {
    console.log("kangax-es6/misc.RegExp-prototype-toString-generic.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.RegExp-prototype-toString-generic.js: exception: " + e);
}
