// ES6: https://github.com/tc39/proposal-private-fields-in-in
// compat-table: ES2016+ > 2022 features > Ergonomic brand checks for private fields (small)
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
    console.log("es2022.ergonomic-brand-checks.js: OK");
  } else {
    console.log("es2022.ergonomic-brand-checks.js: FAIL");
  }
} catch (e) {
  console.log("es2022.ergonomic-brand-checks.js: FAIL: " + e);
}