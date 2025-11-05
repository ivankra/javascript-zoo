// compat-table: ES6 > syntax > default function parameters (medium) > separate scope
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-functiondeclarationinstantiation
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function(a=function(){
    return typeof b === 'undefined';
  }){
    var b = 1;
    return a();
  }());
}

try {
  if (testCode()) {
    console.log("kangax-es6/default-params.separate-scope.js: OK");
  } else {
    console.log("kangax-es6/default-params.separate-scope.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/default-params.separate-scope.js: exception: " + e);
}
