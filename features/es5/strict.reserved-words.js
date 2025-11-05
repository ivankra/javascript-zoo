// ES5: 7.6.1.2 Future Reserved Words
// compat-table: ES5 > Strict mode (large) > reserved words
//
// "The identifiers "implements", "interface", "let", "package", "private",
// "protected", "public", "static", and "yield" are classified as
// FutureReservedWord tokens within strict mode code. (7.6.12)."
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  var words = 'implements,interface,let,package,private,protected,public,static,yield'.split(',');
  var ok = 0;
  for (var i = 0; i < words.length; i++) {
    try {
      eval('var ' + words[i]);
      console.log("es5/strict.reserved-words.js: 'var " + words[i] + "' did not throw in strict mode");
      break;
    } catch (err) {
      if (!(err instanceof SyntaxError)) {
        console.log("es5/strict.reserved-words.js: 'var " + words[i] + "' throws but not-SyntaxError");
        break;
      } else {
        ok++;
      }
    }
  }

  return ok;
})();

if (result === 9) {
  console.log("es5/strict.reserved-words.js: OK");
} else {
  console.log("es5/strict.reserved-words.js: failed");
}
