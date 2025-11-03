// ES5: 10.6 Arguments Object
// ES5: Annex C The Strict Mode of ECMAScript
// compat-table: ES5 > Strict mode (large) > arguments is unmapped
//
// "Arguments objects for strict mode functions do not dynamically share their
// array indexed property values with the corresponding formal parameter
// bindings of their functions. (10.6)."
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  var test1 = (function(x){
    x = 2;
    return arguments[0] === 1;
  })(1);

  var test2 = (function(x){
    arguments[0] = 2;
    return x === 1;
  })(1);

  return test1 && test2;
})();

if (result === true) {
  console.log("es5.strict.unmapped-arguments.js: OK");
} else {
  console.log("es5.strict.unmapped-arguments.js: FAIL");
}
