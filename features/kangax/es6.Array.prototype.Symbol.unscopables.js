// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-prototype-object
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@unscopables
// compat-table: ES6 > built-in extensions > Array.prototype methods (medium) > Array.prototype[Symbol.unscopables]
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var unscopables = Array.prototype[Symbol.unscopables];
  if (!unscopables) {
    return false;
  }
  var ns = "find,findIndex,fill,copyWithin,entries,keys,values".split(",");
  for (var i = 0; i < ns.length; i++) {
    if (Array.prototype[ns[i]] && !unscopables[ns[i]]) return false;
  }
  return true;
}

try {
  if (testCode()) {
    console.log("es6.Array.prototype.Symbol.unscopables.js: OK");
  } else {
    console.log("es6.Array.prototype.Symbol.unscopables.js: FAIL");
  }
} catch (e) {
  console.log("es6.Array.prototype.Symbol.unscopables.js: FAIL: " + e);
}