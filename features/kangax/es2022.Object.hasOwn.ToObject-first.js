// ES6: https://github.com/tc39/proposal-accessible-object-hasownproperty
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
// compat-table: ES2016+ > 2022 features > Object.hasOwn (small) > ToObject called before ToPropertyKey
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
    console.log("es2022.Object.hasOwn.ToObject-first.js: OK");
  } else {
    console.log("es2022.Object.hasOwn.ToObject-first.js: FAIL");
  }
} catch (e) {
  console.log("es2022.Object.hasOwn.ToObject-first.js: FAIL: " + e);
}