// compat-table: ES6 > misc > own property order (tiny) > Object.assign
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var result = '';
  var target = {};

  "012349 DBACEFGHIJKLMNOPQRST".split('').concat(-1).forEach(function(key){
    Object.defineProperty(target, key, {
      set: function(){
        result += key;
      }
    })
  });

  var obj = {2: 2, 0: 0, 1: 1, ' ': ' ', 9: 9, D: 'D', B: 'B', '-1': '-1'};
  Object.defineProperty(obj, 'A', {value: 'A',  enumerable: true});
  Object.defineProperty(obj, '3', {value: '3',  enumerable: true});
  Object.defineProperty(obj, 'C', {value: 'C',  enumerable: true});
  Object.defineProperty(obj, '4', {value: '4',  enumerable: true});
  delete obj[2];
  obj[2] = true;

  "EFGHIJKLMNOPQRST".split('').forEach(function(key){
    obj[key] = key;
  });

  Object.assign(target, obj);

  return result === "012349 DB-1ACEFGHIJKLMNOPQRST";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.property-order.Object.assign.js: OK");
  } else {
    console.log("kangax-es6/misc.property-order.Object.assign.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.property-order.Object.assign.js: exception: " + e);
}
