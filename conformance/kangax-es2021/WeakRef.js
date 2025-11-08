// compat-table: ES2016+ > 2021 features > WeakReferences (large) > WeakRef minimal support
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef
// spec: https://github.com/tc39/proposal-weakrefs#weak-references
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
    console.log("kangax-es2021/WeakRef.js: OK");
  } else {
    console.log("kangax-es2021/WeakRef.js: failed");
  }
} catch (e) {
  console.log("kangax-es2021/WeakRef.js: exception: " + e);
}
