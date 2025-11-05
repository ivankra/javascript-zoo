// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > IteratorComplete, IteratorValue
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // IteratorComplete -> Get -> [[Get]]
  // IteratorValue -> Get -> [[Get]]
  var get = [];
  var iterable = {};
  iterable[Symbol.iterator] = function() {
    return {
      next: function() {
        return new Proxy({ value: 2, done: false }, { get: function(o, k) { get.push(k); return o[k]; }});
      }
    };
  }
  var i = 0;
  for(var e of iterable) {
    if (++i >= 2) break;
  }
  return get + '' === "done,value,done,value";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.get.IteratorComplete.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.get.IteratorComplete.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.get.IteratorComplete.js: exception: " + e);
}
