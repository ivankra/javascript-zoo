// compat-table: ES2016+ > 2016 misc > strict fn w/ non-strict non-simple params is error (tiny)
// spec: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-functiondeclarationinstantiation
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function foo(...a) {}
    try {
      Function("function bar(...a) {'use strict';}")();
    } catch (e) {
      return true;
    }
}

try {
  if (testCode()) {
    console.log("kangax-es2016/misc.strict-fn-non-simple-params-error.js: OK");
  } else {
    console.log("kangax-es2016/misc.strict-fn-non-simple-params-error.js: failed");
  }
} catch (e) {
  console.log("kangax-es2016/misc.strict-fn-non-simple-params-error.js: exception: " + e);
}
