// compat-table: ES Next > Stage 3 > Class and Property Decorators (medium) > class decorators
// spec: https://github.com/wycats/javascript-decorators
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class A {
    @nonconf
    get B() {}
  }
  function nonconf(target, name, descriptor) {
    descriptor.configurable = false;
    return descriptor;
  }
  return Object.getOwnPropertyDescriptor(A.prototype, "B").configurable === false;
}

try {
  if (testCode()) {
    console.log("kangax-next/class-decorators.js: OK");
  } else {
    console.log("kangax-next/class-decorators.js: failed");
  }
} catch (e) {
  console.log("kangax-next/class-decorators.js: exception: " + e);
}
