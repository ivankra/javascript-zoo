// compat-table: ES2016+ > 2019 misc > optional catch binding (small) > basic
// spec: https://github.com/tc39/proposal-optional-catch-binding
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    throw new Error();
  }
  catch {
    return true;
  }
  return false;
}

try {
  if (testCode()) {
    console.log("kangax-es2019/misc.optional-catch-binding.js: OK");
  } else {
    console.log("kangax-es2019/misc.optional-catch-binding.js: failed");
  }
} catch (e) {
  console.log("kangax-es2019/misc.optional-catch-binding.js: exception: " + e);
}
