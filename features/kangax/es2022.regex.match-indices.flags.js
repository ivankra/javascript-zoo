// ES6: https://github.com/tc39/proposal-regexp-match-indices
// compat-table: ES2016+ > 2022 features > RegExp Match Indices (`hasIndices` / `d` flag) (small) > shows up in flags
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof global === "undefined") global = this;

function testCode() {
  var expected = ['hasIndices'];
  // Sorted alphabetically by shortname as of ES2022 – "dgimsuy".
  // Any flags introduced after ES2022 will be ignored by this test.
  if ('global' in RegExp.prototype) expected.push('global');
  if ('ignoreCase' in RegExp.prototype) expected.push('ignoreCase');
  if ('multiline' in RegExp.prototype) expected.push('multiline');
  if ('dotAll' in RegExp.prototype) expected.push('dotAll');
  if ('unicode' in RegExp.prototype) expected.push('unicode');
  if ('sticky' in RegExp.prototype) expected.push('sticky');
  var actual = [];
  var p = new Proxy({}, { get: function (o, k) { actual.push(k); return o[k]; }});
  Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get.call(p);
  var i = 0;
  for (var j = 0; i < expected.length && j < actual.length; i++, j++) {
    if (expected[i] !== actual[j]) j++;
  }
  return i === expected.length;
}

try {
  if (testCode()) {
    console.log("es2022.regex.match-indices.flags.js: OK");
  } else {
    console.log("es2022.regex.match-indices.flags.js: FAIL");
  }
} catch (e) {
  console.log("es2022.regex.match-indices.flags.js: FAIL: " + e);
}