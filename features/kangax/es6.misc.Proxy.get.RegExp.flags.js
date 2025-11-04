// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > RegExp.prototype.flags
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof global === "undefined") global = this;

function testCode() {
  // RegExp.prototype.flags -> Get -> [[Get]]
  var expected = [];
  // Sorted alphabetically by shortname – "gimsuy".
  if ('hasIndices' in RegExp.prototype) expected.push('hasIndices');
  if ('global' in RegExp.prototype) expected.push('global');
  if ('ignoreCase' in RegExp.prototype) expected.push('ignoreCase');
  if ('multiline' in RegExp.prototype) expected.push('multiline');
  if ('dotAll' in RegExp.prototype) expected.push('dotAll');
  if ('unicode' in RegExp.prototype) expected.push('unicode');
  if ('unicodeSets' in RegExp.prototype) expected.push('unicodeSets');
  if ('sticky' in RegExp.prototype) expected.push('sticky');

  var actual = [];
  var p = new Proxy({}, { get: function(o, k) { actual.push(k); return o[k]; }});
  Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get.call(p);
  if (expected.length !== actual.length) return false;
  for (var i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) return false;
  }
  return true;
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.get.RegExp.flags.js: OK");
  } else {
    console.log("es6.misc.Proxy.get.RegExp.flags.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.get.RegExp.flags.js: FAIL: " + e);
}