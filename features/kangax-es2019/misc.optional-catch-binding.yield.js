// compat-table: ES2016+ > 2019 misc > optional catch binding (small) > yield
// spec: https://github.com/tc39/proposal-optional-catch-binding
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function *foo() {
    try {
      yield;
    }
    catch {
      return true;
    }
  }

  var it = foo();
  it.next();
  return it.throw().value;
}

try {
  if (testCode()) {
    console.log("kangax-es2019/misc.optional-catch-binding.yield.js: OK");
  } else {
    console.log("kangax-es2019/misc.optional-catch-binding.yield.js: failed");
  }
} catch (e) {
  console.log("kangax-es2019/misc.optional-catch-binding.yield.js: exception: " + e);
}
