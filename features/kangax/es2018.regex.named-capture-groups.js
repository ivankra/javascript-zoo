// ES6: https://github.com/tc39/proposal-regexp-named-groups
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges
// compat-table: ES2016+ > 2018 features > RegExp named capture groups (small)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var result = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.exec('2016-03-11');
  return result.groups.year === '2016'
    && result.groups.month === '03'
    && result.groups.day === '11'
    && result[0] === '2016-03-11'
    && result[1] === '2016'
    && result[2] === '03'
    && result[3] === '11';
}

try {
  if (testCode()) {
    console.log("es2018.regex.named-capture-groups.js: OK");
  } else {
    console.log("es2018.regex.named-capture-groups.js: FAIL");
  }
} catch (e) {
  console.log("es2018.regex.named-capture-groups.js: FAIL: " + e);
}