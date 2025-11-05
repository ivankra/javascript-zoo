// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.toStringTag, misc. built-ins
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var s = Symbol.toStringTag;
  return Math[s] === "Math"
    && JSON[s] === "JSON";
}

try {
  if (testCode()) {
    console.log("kangax-es6/well-known.toStringTag.misc-builtins.js: OK");
  } else {
    console.log("kangax-es6/well-known.toStringTag.misc-builtins.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/well-known.toStringTag.misc-builtins.js: exception: " + e);
}
