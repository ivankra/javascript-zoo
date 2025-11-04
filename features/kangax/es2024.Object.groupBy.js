// ES6: https://github.com/tc39/proposal-array-grouping
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy
// compat-table: ES2016+ > 2024 features > Array Grouping (small) > Object.groupBy()
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const array = [1, 2, 3, 4];
  const obj = Object.groupBy(array, (num, index) => {
    return num % 2 === 0 ? 'even': 'odd';
  });
  return !('toString' in obj) && obj.even[0] == 2 && obj.odd[0] == 1;
}

try {
  if (testCode()) {
    console.log("es2024.Object.groupBy.js: OK");
  } else {
    console.log("es2024.Object.groupBy.js: FAIL");
  }
} catch (e) {
  console.log("es2024.Object.groupBy.js: FAIL: " + e);
}