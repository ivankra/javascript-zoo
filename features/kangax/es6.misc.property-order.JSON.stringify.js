// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys
// compat-table: ES6 > misc > own property order (tiny) > JSON.stringify
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = {
    2: true,
    0: true,
    1: true,
    ' ': true,
    9: true,
    D: true,
    B: true,
    '-1': true
  };
  obj.A = true;
  obj[3] = true;
  "EFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(function(key){
    obj[key] = true;
  });
  Object.defineProperty(obj, 'C', { value: true, enumerable: true });
  Object.defineProperty(obj, '4', { value: true, enumerable: true });
  delete obj[2];
  obj[2] = true;

  return JSON.stringify(obj) ===
    '{"0":true,"1":true,"2":true,"3":true,"4":true,"9":true," ":true,"D":true,"B":true,"-1":true,"A":true,"E":true,"F":true,"G":true,"H":true,"I":true,"J":true,"K":true,"L":true,"M":true,"N":true,"O":true,"P":true,"Q":true,"R":true,"S":true,"T":true,"U":true,"V":true,"W":true,"X":true,"Y":true,"Z":true,"C":true}';
}

try {
  if (testCode()) {
    console.log("es6.misc.property-order.JSON.stringify.js: OK");
  } else {
    console.log("es6.misc.property-order.JSON.stringify.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.property-order.JSON.stringify.js: FAIL: " + e);
}