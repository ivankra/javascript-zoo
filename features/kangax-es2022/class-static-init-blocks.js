// compat-table: ES2016+ > 2022 features > Class static initialization blocks (small)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks
// spec: https://github.com/tc39/proposal-class-static-block
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
    console.log("kangax-es2022/class-static-init-blocks.js: OK");
  } else {
    console.log("kangax-es2022/class-static-init-blocks.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/class-static-init-blocks.js: exception: " + e);
}
