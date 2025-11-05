// compat-table: ES2016+ > 2016 misc > Proxy internal calls, Array.prototype.includes (tiny)
// spec: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-array.prototype.includes
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Array.prototype.includes -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({length: 3, 0: '', 1: '', 2: '', 3: ''}, { get: function (o, k) { get.push(k); return o[k]; }});
  Array.prototype.includes.call(p, {});
  if (get + '' !== "length,0,1,2") return;

  get = [];
  p = new Proxy({length: 4, 0: NaN, 1: '', 2: NaN, 3: ''}, { get: function (o, k) { get.push(k); return o[k]; }});
  Array.prototype.includes.call(p, NaN, 1);
  return (get + '' === "length,1,2");
}

try {
  if (testCode()) {
    console.log("kangax-es2016/misc.Proxy-Array-includes.js: OK");
  } else {
    console.log("kangax-es2016/misc.Proxy-Array-includes.js: failed");
  }
} catch (e) {
  console.log("kangax-es2016/misc.Proxy-Array-includes.js: exception: " + e);
}
