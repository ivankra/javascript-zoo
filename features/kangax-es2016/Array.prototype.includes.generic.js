// compat-table: ES2016+ > 2016 features > Array.prototype.includes (small) > Array.prototype.includes is generic
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
// spec: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-array.prototype.includes
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = 0;
  return [].includes.call(
    {
      get "0"() {
        passed = NaN;
        return 'foo';
      },
      get "11"() {
        passed += 1;
        return 0;
      },
      get "19"() {
        passed += 1;
        return 'foo';
      },
      get "21"() {
        passed = NaN;
        return 'foo';
      },
      get length() {
        passed += 1;
        return 24;
      }
    },
    'foo',
    6
  ) === true && passed === 3;
}

try {
  if (testCode()) {
    console.log("kangax-es2016/Array.prototype.includes.generic.js: OK");
  } else {
    console.log("kangax-es2016/Array.prototype.includes.generic.js: failed");
  }
} catch (e) {
  console.log("kangax-es2016/Array.prototype.includes.generic.js: exception: " + e);
}
