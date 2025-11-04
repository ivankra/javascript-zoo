// ES6: https://github.com/tc39/String.prototype.matchAll
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll
// compat-table: ES2016+ > 2020 features > String.prototype.matchAll (small) > basic functionality
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var iterator = '11a2bb'.matchAll(/(\d)(\D)/g);
  if(iterator[Symbol.iterator]() !== iterator)return false;
  var a = '', b = '', c = '', step;
  while(!(step = iterator.next()).done) {
    a += step.value[0];
    b += step.value[1];
    c += step.value[2];
  }
  return a === '1a2b'
    && b === '12'
    && c === 'ab';
}

try {
  if (testCode()) {
    console.log("es2020.String.prototype.matchAll.js: OK");
  } else {
    console.log("es2020.String.prototype.matchAll.js: FAIL");
  }
} catch (e) {
  console.log("es2020.String.prototype.matchAll.js: FAIL: " + e);
}