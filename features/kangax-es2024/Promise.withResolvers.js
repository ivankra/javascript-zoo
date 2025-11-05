// compat-table: ES2016+ > 2024 features > Promise.withResolvers (tiny)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers
// spec: https://tc39.es/proposal-promise-with-resolvers/
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = Promise.withResolvers();
  return obj instanceof Object
    && obj.promise instanceof Promise
    && typeof obj.resolve === 'function'
    && typeof obj.reject === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es2024/Promise.withResolvers.js: OK");
  } else {
    console.log("kangax-es2024/Promise.withResolvers.js: failed");
  }
} catch (e) {
  console.log("kangax-es2024/Promise.withResolvers.js: exception: " + e);
}
