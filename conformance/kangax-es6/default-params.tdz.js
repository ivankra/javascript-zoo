// compat-table: ES6 > syntax > default function parameters (medium) > temporal dead zone
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-functiondeclarationinstantiation
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function(x = 1) {
    try {
      eval("(function(a=a){}())");
      return false;
    } catch(e) {}
    try {
      eval("(function(a=b,b){}())");
      return false;
    } catch(e) {}
    return true;
  }());
}

try {
  if (testCode()) {
    console.log("kangax-es6/default-params.tdz.js: OK");
  } else {
    console.log("kangax-es6/default-params.tdz.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/default-params.tdz.js: exception: " + e);
}
