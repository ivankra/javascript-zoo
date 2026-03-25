// compat-table: ES Next > Stage 3 > Explicit Resource Management (large) > Symbol.dispose with bound function
// spec: https://github.com/tc39/proposal-explicit-resource-management
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var disposed = false;
  var resource = {
    [Symbol.dispose]: close.bind(null),
  };
  function close() {
    disposed = true;
  }
  {
    using _ = resource;
  }
  return disposed;
}

try {
  if (testCode()) {
    console.log("compat-table/next/Symbol.dispose.bound.js: OK");
  } else {
    console.log("compat-table/next/Symbol.dispose.bound.js: failed");
  }
} catch (e) {
  console.log("compat-table/next/Symbol.dispose.bound.js: exception: " + e);
}
