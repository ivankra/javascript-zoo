// compat-table: ES6 > functions > super (medium) > constructor calls use correct "new.target" binding
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-super-keyword
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed;
  class B {
    constructor() { passed = (new.target === C); }
  }
  class C extends B {
    constructor() { super(); }
  }
  new C();
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/super.new-target-binding.js: OK");
  } else {
    console.log("kangax-es6/super.new-target-binding.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/super.new-target-binding.js: exception: " + e);
}
