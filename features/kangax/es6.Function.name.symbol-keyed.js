// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-setfunctionname
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
// compat-table: ES6 > built-in extensions > function "name" property (small) > symbol-keyed methods
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var sym1 = Symbol("foo");
  var sym2 = Symbol();
  var o = {
    [sym1]: function(){},
    [sym2]: function(){}
  };

  return o[sym1].name === "[foo]" &&
         o[sym2].name === "";
}

try {
  if (testCode()) {
    console.log("es6.Function.name.symbol-keyed.js: OK");
  } else {
    console.log("es6.Function.name.symbol-keyed.js: FAIL");
  }
} catch (e) {
  console.log("es6.Function.name.symbol-keyed.js: FAIL: " + e);
}