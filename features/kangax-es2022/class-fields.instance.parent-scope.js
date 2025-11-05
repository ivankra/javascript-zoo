// compat-table: ES2016+ > 2022 features > instance class fields (medium) > resolving identifier in parent scope
// spec: https://github.com/tc39/proposal-class-fields
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  {
    let a = ["hello world"];
    class MyClass {
      // The parenthesis below are required to trigger https://bugs.webkit.org/show_bug.cgi?id=236843
      c = a[(0)];
    }
    return new MyClass().c === a[0];
  }
}

try {
  if (testCode()) {
    console.log("kangax-es2022/class-fields.instance.parent-scope.js: OK");
  } else {
    console.log("kangax-es2022/class-fields.instance.parent-scope.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/class-fields.instance.parent-scope.js: exception: " + e);
}
