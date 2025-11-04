// ES6: https://github.com/tc39/proposal-class-static-block
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks
// compat-table: ES2016+ > 2022 features > Class static initialization blocks (small)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  let ok = false;
  class A {
    static { ok = true; }
  }
  return ok;
}

try {
  if (testCode()) {
    console.log("es2022.class-static-init-blocks.js: OK");
  } else {
    console.log("es2022.class-static-init-blocks.js: FAIL");
  }
} catch (e) {
  console.log("es2022.class-static-init-blocks.js: FAIL: " + e);
}