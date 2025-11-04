// ES6: https://github.com/tc39/proposal-regex-escaping
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape
// compat-table: ES2016+ > 2025 features > RegExp Escaping (medium)
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
    console.log("es2025.RegExp.escape.js: OK");
  } else {
    console.log("es2025.RegExp.escape.js: FAIL");
  }
} catch (e) {
  console.log("es2025.RegExp.escape.js: FAIL: " + e);
}