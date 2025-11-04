// ES6: https://github.com/tc39/proposal-explicit-resource-management
// compat-table: ES Next > Stage 3 > Explicit Resource Management (large) > DisposableStack
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var stack1 = new DisposableStack();
  var resource1 = { disposed: false };
  var resource2 = { disposed: false };
  var resource3 = { disposed: false, [Symbol.dispose]() { this.disposed = true } };
  var adopted = stack1.adopt(resource1, function (r) { r.disposed = true });
  var deferred = stack1.defer(function (r) { resource2.disposed = true });
  var stack2 = stack1.move();
  var used = stack2.use(resource3);
  stack2.dispose();
  return (
    resource1.disposed && adopted === resource1
    && resource2.disposed && deferred === undefined
    && resource3.disposed && used === resource3
  );
}

try {
  if (testCode()) {
    console.log("esnext.DisposableStack.js: OK");
  } else {
    console.log("esnext.DisposableStack.js: FAIL");
  }
} catch (e) {
  console.log("esnext.DisposableStack.js: FAIL: " + e);
}