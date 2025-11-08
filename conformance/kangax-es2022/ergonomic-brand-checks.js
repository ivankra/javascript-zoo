// compat-table: ES2016+ > 2022 features > Ergonomic brand checks for private fields (small)
// spec: https://github.com/tc39/proposal-private-fields-in-in
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class A {
    #x;
    static check(obj) {
      return #x in obj;
    }
  }
  return A.check(new A) && !A.check({});
}

try {
  if (testCode()) {
    console.log("kangax-es2022/ergonomic-brand-checks.js: OK");
  } else {
    console.log("kangax-es2022/ergonomic-brand-checks.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/ergonomic-brand-checks.js: exception: " + e);
}
