// ES6: https://github.com/tc39/proposal-global
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
// compat-table: ES2016+ > 2020 features > globalThis (small) > "globalThis" global property has correct property descriptor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof globalThis === "undefined") globalThis = this;

function testCode() {
  var actualGlobal = Function('return this')();
  if (typeof globalThis !== 'object') { return false; }
  if (!('globalThis' in actualGlobal)) { return false; }
  if (Object.prototype.propertyIsEnumerable.call(actualGlobal, 'globalThis')) { return false; }

  var descriptor = Object.getOwnPropertyDescriptor(actualGlobal, 'globalThis');
  return descriptor.value === actualGlobal && !descriptor.enumerable && descriptor.configurable && descriptor.writable;
}

try {
  if (testCode()) {
    console.log("es2020.globalThis.descriptor.js: OK");
  } else {
    console.log("es2020.globalThis.descriptor.js: FAIL");
  }
} catch (e) {
  console.log("es2020.globalThis.descriptor.js: FAIL: " + e);
}