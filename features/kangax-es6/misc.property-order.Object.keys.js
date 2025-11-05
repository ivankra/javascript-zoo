// compat-table: ES6 > misc > own property order (tiny) > Object.keys
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = {
    // Non-negative integer names appear first in value order
    2: true,
    0: true,
    1: true,
    // Other string names appear in source order
    ' ': true,
    // Non-negative integers are sorted above other names
    9: true,
    D: true,
    B: true,
    // Negative integers are treated as other names
    '-1': true
  };
  // Other string names are added in order of creation
  obj.A = true;
  // Non-negative integer names, conversely, ignore order of creation
  obj[3] = true;
  // Having a total of 20+ properties doesn't affect property order
  "EFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(function(key){
    obj[key] = true;
  });
  // Object.defineProperty doesn't affect the above rules
  Object.defineProperty(obj, 'C', { value: true, enumerable: true });
  Object.defineProperty(obj, '4', { value: true, enumerable: true });
  // Deleting and reinserting a property doesn't preserve its position
  delete obj[2];
  obj[2] = true;

  var forInOrder = '';
  for(var key in obj)forInOrder += key;

  return Object.keys(obj).join('') === forInOrder;
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.property-order.Object.keys.js: OK");
  } else {
    console.log("kangax-es6/misc.property-order.Object.keys.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.property-order.Object.keys.js: exception: " + e);
}
