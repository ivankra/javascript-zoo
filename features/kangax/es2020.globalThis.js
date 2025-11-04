// ES6: https://github.com/tc39/proposal-global
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
// compat-table: ES2016+ > 2020 features > globalThis (small) > "globalThis" global property is global object
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

this.lacksGlobalThis = typeof globalThis === "undefined";
if (typeof globalThis === "undefined") globalThis = this;

function testCode() {
  var actualGlobal = Function('return this')();
  actualGlobal.__system_global_test__ = 42;
  return typeof globalThis === 'object' && globalThis && globalThis === actualGlobal && !globalThis.lacksGlobalThis && globalThis.__system_global_test__ === 42;
}

try {
  if (testCode()) {
    console.log("es2020.globalThis.js: OK");
  } else {
    console.log("es2020.globalThis.js: FAIL");
  }
} catch (e) {
  console.log("es2020.globalThis.js: FAIL: " + e);
}