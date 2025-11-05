// compat-table: ES Next > Stage 3 > Explicit Resource Management (large) > SuppressedError
// spec: https://github.com/tc39/proposal-explicit-resource-management
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var err1 = new Error();
  var err2 = new Error();
  var err3 = new Error();
  try {
    using _1 = { [Symbol.dispose]() { throw err1 } },
          _2 = { [Symbol.dispose]() { throw err2 } };
    throw err3;
  } catch (e) {
    return (
      e instanceof SuppressedError
      && e.error === err1
      && e.suppressed instanceof SuppressedError
      && e.suppressed.error === err2
      && e.suppressed.suppressed === err3
    );
  }
}

try {
  if (testCode()) {
    console.log("kangax-next/SuppressedError.js: OK");
  } else {
    console.log("kangax-next/SuppressedError.js: failed");
  }
} catch (e) {
  console.log("kangax-next/SuppressedError.js: exception: " + e);
}
