// ES6: https://github.com/tc39/proposal-weakrefs#finalizers
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef
// compat-table: ES2016+ > 2021 features > WeakReferences (large) > FinalizationRegistry minimal support
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var fr = new FinalizationRegistry(function () {});
  return Object.getPrototypeOf(fr) === FinalizationRegistry.prototype;
}

try {
  if (testCode()) {
    console.log("es2021.FinalizationRegistry.js: OK");
  } else {
    console.log("es2021.FinalizationRegistry.js: FAIL");
  }
} catch (e) {
  console.log("es2021.FinalizationRegistry.js: FAIL: " + e);
}