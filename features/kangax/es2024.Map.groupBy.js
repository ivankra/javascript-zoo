// ES6: https://github.com/tc39/proposal-array-grouping
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/groupBy
// compat-table: ES2016+ > 2024 features > Array Grouping (small) > Map.groupBy()
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const array = [1, 2, 3, 4];
  const odd  = { odd: true };
  const even = { even: true };
  const map = Map.groupBy(array, (num, index) => {
    return num % 2 === 0 ? even: odd;
  });
  return map instanceof Map && map.get(even)[0] === 2 && map.get(odd)[0] === 1;
}

try {
  if (testCode()) {
    console.log("es2024.Map.groupBy.js: OK");
  } else {
    console.log("es2024.Map.groupBy.js: FAIL");
  }
} catch (e) {
  console.log("es2024.Map.groupBy.js: FAIL: " + e);
}