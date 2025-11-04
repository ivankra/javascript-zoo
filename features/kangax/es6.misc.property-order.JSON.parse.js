// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys
// compat-table: ES6 > misc > own property order (tiny) > JSON.parse
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var result = '';
  JSON.parse(
    '{"0":true,"1":true,"2":true,"3":true,"4":true,"9":true," ":true,"D":true,"B":true,"-1":true,"E":true,"F":true,"G":true,"H":true,"I":true,"J":true,"K":true,"L":true,"A":true,"C":true}',
    function reviver(k,v) {
      result += k;
      return v;
    }
  );
  return result === "012349 DB-1EFGHIJKLAC";
}

try {
  if (testCode()) {
    console.log("es6.misc.property-order.JSON.parse.js: OK");
  } else {
    console.log("es6.misc.property-order.JSON.parse.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.property-order.JSON.parse.js: FAIL: " + e);
}