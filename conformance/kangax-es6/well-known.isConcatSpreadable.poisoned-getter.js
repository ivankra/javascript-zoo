// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.isConcatSpreadable, spreadable object with poisoned getter
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  if (typeof Symbol !== 'function' || !Symbol.isConcatSpreadable) {
    return null;
  }
  var spreadableHasPoisonedIndex = { length: Math.pow(2, 53) - 1 };
  spreadableHasPoisonedIndex[Symbol.isConcatSpreadable] = true;
  Object.defineProperty(spreadableHasPoisonedIndex, 0, {
    get: function () { throw new SyntaxError(); }
  });
  try {
    [].concat(spreadableHasPoisonedIndex);
    return false;
  } catch (e) {
    return !!e && e.name === 'SyntaxError';
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/well-known.isConcatSpreadable.poisoned-getter.js: OK");
  } else {
    console.log("kangax-es6/well-known.isConcatSpreadable.poisoned-getter.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/well-known.isConcatSpreadable.poisoned-getter.js: exception: " + e);
}
