// ES6: https://github.com/tc39/proposal-explicit-resource-management
// compat-table: ES Next > Stage 3 > Explicit Resource Management (large) > for (using ... of
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var resource1 = {
    disposed: false,
    [Symbol.dispose]() {
      this.disposed = true;
    }
  };
  var resource2 = {
    disposed: false,
    [Symbol.dispose]() {
      this.disposed = true;
    }
  };
  {
    for (using _ of [resource1, resource2]);
  }
  return resource1.disposed && resource2.disposed;
}

try {
  if (testCode()) {
    console.log("esnext.using.for-of.js: OK");
  } else {
    console.log("esnext.using.for-of.js: FAIL");
  }
} catch (e) {
  console.log("esnext.using.for-of.js: FAIL: " + e);
}