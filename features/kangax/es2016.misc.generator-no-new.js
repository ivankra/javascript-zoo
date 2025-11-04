// ES6: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-createdynamicfunction
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*#Generators_are_not_constructable
// compat-table: ES2016+ > 2016 misc > generator functions can't be used with "new" (tiny)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function * generator() {
    yield 3;
  }
  try {
    new generator();
  } catch (e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("es2016.misc.generator-no-new.js: OK");
  } else {
    console.log("es2016.misc.generator-no-new.js: FAIL");
  }
} catch (e) {
  console.log("es2016.misc.generator-no-new.js: FAIL: " + e);
}