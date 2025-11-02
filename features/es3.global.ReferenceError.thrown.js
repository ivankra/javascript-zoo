// ES3: 8.7.1 GetValue (V)
// ES3: 15.11.6.3 ReferenceError
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var caught = 0;
try {
  var x = undeclaredVariable;
} catch (e) {
  if (e.name == "ReferenceError") {
    ok++;
  } else {
    console.log("es3.global.ReferenceError.thrown.js: wrong exception for undeclared variable");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.ReferenceError.thrown.js: no exception for undeclared variable");
}

caught = 0;
try {
  nonExistentFunction();
} catch (e) {
  if (e.name == "ReferenceError") {
    ok++;
  } else {
    console.log("es3.global.ReferenceError.thrown.js: wrong exception for undeclared function");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.ReferenceError.thrown.js: no exception for undeclared function");
}

caught = 0;
try {
  anotherUndeclared = anotherUndeclared + 1;
} catch (e) {
  if (e.name == "ReferenceError") {
    ok++;
  } else {
    console.log("es3.global.ReferenceError.thrown.js: wrong exception for undeclared in expression");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.ReferenceError.thrown.js: no exception for undeclared in expression");
}

caught = 0;
try {
  var y = undeclaredVariable.property;
} catch (e) {
  if (e.name == "ReferenceError") {
    ok++;
  } else {
    console.log("es3.global.ReferenceError.thrown.js: wrong exception for property access on undeclared");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.ReferenceError.thrown.js: no exception for property access on undeclared");
}

if (ok == 4) {
  console.log("es3.global.ReferenceError.thrown.js: OK");
} else {
  console.log("es3.global.ReferenceError.thrown.js: FAIL");
}
