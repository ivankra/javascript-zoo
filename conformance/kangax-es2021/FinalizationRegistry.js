// compat-table: ES2016+ > 2021 features > WeakReferences (large) > FinalizationRegistry minimal support
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef
// spec: https://github.com/tc39/proposal-weakrefs#finalizers
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
    console.log("kangax-es2021/FinalizationRegistry.js: OK");
  } else {
    console.log("kangax-es2021/FinalizationRegistry.js: failed");
  }
} catch (e) {
  console.log("kangax-es2021/FinalizationRegistry.js: exception: " + e);
}
