// compat-table: ES2016+ > 2025 features > RegExp Escaping (medium)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape
// spec: https://github.com/tc39/proposal-regex-escaping
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return RegExp.escape("The Quick Brown Fox") === "\\x54he\\x20Quick\\x20Brown\\x20Fox" &&
    RegExp.escape("(*.*)") === "\\(\\*\\.\\*\\)" &&
    RegExp.escape("｡^･ｪ･^｡") === "｡\\^･ｪ･\\^｡" &&
    RegExp.escape("\\d \\D (?:)") === "\\\\d\\x20\\\\D\\x20\\(\\?\\x3a\\)";
}

try {
  if (testCode()) {
    console.log("kangax-es2025/RegExp.escape.js: OK");
  } else {
    console.log("kangax-es2025/RegExp.escape.js: failed");
  }
} catch (e) {
  console.log("kangax-es2025/RegExp.escape.js: exception: " + e);
}
