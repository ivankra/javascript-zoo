// ES6: https://github.com/tc39/proposal-weakrefs#weak-references
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef
// compat-table: ES2016+ > 2021 features > WeakReferences (large) > WeakRef minimal support
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var O = {};
  var weakref = new WeakRef(O);
  return weakref.deref() === O;
}

try {
  if (testCode()) {
    console.log("es2021.WeakRef.js: OK");
  } else {
    console.log("es2021.WeakRef.js: FAIL");
  }
} catch (e) {
  console.log("es2021.WeakRef.js: FAIL: " + e);
}