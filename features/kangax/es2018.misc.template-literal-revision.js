// ES6: https://github.com/tc39/proposal-template-literal-revision
// compat-table: ES2016+ > 2018 misc > template literal revision (small)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function tag(strings, a) {
    return strings[0] === void undefined
      && strings.raw[0] === "\\01\\1\\xg\\xAg\\u0\\u0g\\u00g\\u000g\\u{g\\u{0\\u{110000}"
      && strings[1] === "\0"
      && strings.raw[1] === "\\0"
      && a === 0;
  }
  return tag`\01\1\xg\xAg\u0\u0g\u00g\u000g\u{g\u{0\u{110000}${0}\0`;
}

try {
  if (testCode()) {
    console.log("es2018.misc.template-literal-revision.js: OK");
  } else {
    console.log("es2018.misc.template-literal-revision.js: FAIL");
  }
} catch (e) {
  console.log("es2018.misc.template-literal-revision.js: FAIL: " + e);
}