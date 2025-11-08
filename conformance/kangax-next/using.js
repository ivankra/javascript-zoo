// compat-table: ES Next > Stage 3 > Explicit Resource Management (large) > using
// spec: https://github.com/tc39/proposal-explicit-resource-management
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var resource = {
    disposed: false,
    [Symbol.dispose]() {
      this.disposed = true;
    }
  };
  {
    using _ = resource;
  }
  return resource.disposed
}

try {
  if (testCode()) {
    console.log("kangax-next/using.js: OK");
  } else {
    console.log("kangax-next/using.js: failed");
  }
} catch (e) {
  console.log("kangax-next/using.js: exception: " + e);
}
