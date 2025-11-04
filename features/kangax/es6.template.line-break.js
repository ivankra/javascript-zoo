// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-template-literals
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
// compat-table: ES6 > syntax > template literals (large) > line break normalisation
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var cr   = eval("`x" + String.fromCharCode(13)    + "y`");
  var lf   = eval("`x" + String.fromCharCode(10)    + "y`");
  var crlf = eval("`x" + String.fromCharCode(13,10) + "y`");

  return cr.length === 3 && lf.length === 3 && crlf.length === 3
    && cr[1] === lf[1] && lf[1] === crlf[1] && crlf[1] === '\n';
}

try {
  if (testCode()) {
    console.log("es6.template.line-break.js: OK");
  } else {
    console.log("es6.template.line-break.js: FAIL");
  }
} catch (e) {
  console.log("es6.template.line-break.js: FAIL: " + e);
}