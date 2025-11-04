// ES6: https://github.com/tc39/ecma262/pull/525
// compat-table: ES2016+ > 2017 misc > RegExp "u" flag, case folding (tiny)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return "ſ".match(/\w/iu) && !"ſ".match(/\W/iu)
    && "\u212a".match(/\w/iu) && !"\u212a".match(/\W/iu)
    && "\u212a".match(/.\b/iu) && "ſ".match(/.\b/iu)
    && !"\u212a".match(/.\B/iu) && !"ſ".match(/.\B/iu);
}

try {
  if (testCode()) {
    console.log("es2017.regex.flags.u.case-folding.js: OK");
  } else {
    console.log("es2017.regex.flags.u.case-folding.js: FAIL");
  }
} catch (e) {
  console.log("es2017.regex.flags.u.case-folding.js: FAIL: " + e);
}