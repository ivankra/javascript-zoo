// ES6: https://github.com/tc39/proposal-shadowrealm
// compat-table: ES Next > Stage 2.7 > ShadowRealm (large)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof ShadowRealm === "function"
    && ["evaluate", "importValue"].every(function(key){
      return key in ShadowRealm.prototype;
    });
}

try {
  if (testCode()) {
    console.log("esnext.ShadowRealm.js: OK");
  } else {
    console.log("esnext.ShadowRealm.js: FAIL");
  }
} catch (e) {
  console.log("esnext.ShadowRealm.js: FAIL: " + e);
}