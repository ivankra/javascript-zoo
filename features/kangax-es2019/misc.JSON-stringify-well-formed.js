// compat-table: ES2016+ > 2019 misc > Well-formed JSON.stringify (small)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Well-formed_JSON.stringify()
// spec: https://github.com/tc39/proposal-well-formed-stringify
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return JSON.stringify('\uDF06\uD834') === "\"\\udf06\\ud834\""
    && JSON.stringify('\uDEAD') === "\"\\udead\"";
}

try {
  if (testCode()) {
    console.log("kangax-es2019/misc.JSON-stringify-well-formed.js: OK");
  } else {
    console.log("kangax-es2019/misc.JSON-stringify-well-formed.js: failed");
  }
} catch (e) {
  console.log("kangax-es2019/misc.JSON-stringify-well-formed.js: exception: " + e);
}
