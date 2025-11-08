// compat-table: ES2016+ > 2019 misc > Function.prototype.toString revision (small) > [native code]
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString
// spec: https://github.com/tc39/Function-prototype-toString-revision
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const NATIVE_EVAL_RE = /\bfunction\b[\s\S]*\beval\b[\s\S]*\([\s\S]*\)[\s\S]*\{[\s\S]*\[[\s\S]*\bnative\b[\s\S]+\bcode\b[\s\S]*\][\s\S]*\}/;
  return NATIVE_EVAL_RE.test(eval + '');
}

try {
  if (testCode()) {
    console.log("kangax-es2019/misc.Function-toString.native-code.js: OK");
  } else {
    console.log("kangax-es2019/misc.Function-toString.native-code.js: failed");
  }
} catch (e) {
  console.log("kangax-es2019/misc.Function-toString.native-code.js: exception: " + e);
}
