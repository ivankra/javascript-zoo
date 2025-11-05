// compat-table: ES2016+ > 2022 features > Object.hasOwn (small) > ToObject called before ToPropertyKey
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
// spec: https://github.com/tc39/proposal-accessible-object-hasownproperty
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var ok = !!Object.hasOwn;
  try {
    Object.hasOwn(null, { toString: function () { ok = false } });
    return false;
  } catch (e) {
    return ok;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es2022/Object.hasOwn.ToObject-first.js: OK");
  } else {
    console.log("kangax-es2022/Object.hasOwn.ToObject-first.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/Object.hasOwn.ToObject-first.js: exception: " + e);
}
