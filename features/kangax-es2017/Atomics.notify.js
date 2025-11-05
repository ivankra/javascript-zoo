// compat-table: ES2016+ > 2017 features > shared memory and atomics (medium) > Atomics.notify
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/notify
// spec: https://tc39.github.io/ecma262/#sec-atomics.notify
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Atomics.notify === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es2017/Atomics.notify.js: OK");
  } else {
    console.log("kangax-es2017/Atomics.notify.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/Atomics.notify.js: exception: " + e);
}
