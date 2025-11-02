// ES3: 15.11.6.5 TypeError
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

// ES3: 11.8.6 The instanceof operator
var caught = 0;
try {
  var x = {} instanceof 5;
} catch (e) {
  if (e.name == "TypeError") {
    ok++;
  } else {
    console.log("es3.global.TypeError.thrown.js: wrong exception for instanceof number");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.TypeError.thrown.js: no exception for instanceof number");
}

// ES3: 11.8.6 The instanceof operator
caught = 0;
try {
  var y = {} instanceof {};
} catch (e) {
  if (e.name == "TypeError") {
    ok++;
  } else {
    console.log("es3.global.TypeError.thrown.js: wrong exception for instanceof non-callable");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.TypeError.thrown.js: no exception for instanceof non-callable");
}

// ES3: 11.8.7 The in operator
caught = 0;
try {
  var a = "prop" in 5;
} catch (e) {
  if (e.name == "TypeError") {
    ok++;
  } else {
    console.log("es3.global.TypeError.thrown.js: wrong exception for in number");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.TypeError.thrown.js: no exception for in number");
}

// ES3: 11.8.7 The in operator
caught = 0;
try {
  var b = "prop" in null;
} catch (e) {
  if (e.name == "TypeError") {
    ok++;
  } else {
    console.log("es3.global.TypeError.thrown.js: wrong exception for in null");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.TypeError.thrown.js: no exception for in null");
}

// ES3: 11.2.2 The new Operator
caught = 0;
try {
  var c = new 123();
} catch (e) {
  if (e.name == "TypeError") {
    ok++;
  } else {
    console.log("es3.global.TypeError.thrown.js: wrong exception for new number");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.TypeError.thrown.js: no exception for new number");
}

// ES3: 11.2.3 Function Calls
caught = 0;
try {
  var d = 123();
} catch (e) {
  if (e.name == "TypeError") {
    ok++;
  } else {
    console.log("es3.global.TypeError.thrown.js: wrong exception for calling number");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.TypeError.thrown.js: no exception for calling number");
}

// ES3: 15.3.4.2 Function.prototype.toString ( )
caught = 0;
try {
  Function.prototype.toString.call({});
} catch (e) {
  if (e.name == "TypeError") {
    ok++;
  } else {
    console.log("es3.global.TypeError.thrown.js: wrong exception for Function.prototype.toString on non-function");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.TypeError.thrown.js: no exception for Function.prototype.toString on non-function");
}

// ES3: 15.3.4.3 Function.prototype.apply (thisArg, argArray)
caught = 0;
try {
  Function.prototype.apply.call({});
} catch (e) {
  if (e.name == "TypeError") {
    ok++;
  } else {
    console.log("es3.global.TypeError.thrown.js: wrong exception for Function.prototype.apply on non-function");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.TypeError.thrown.js: no exception for Function.prototype.apply on non-function");
}

// ES3: 9.9 ToObject
// ES3: 11.2.1 Property Accessors
caught = 0;
try {
  var z = null.property;
} catch (e) {
  if (e.name == "TypeError") {
    ok++;
  } else {
    console.log("es3.global.TypeError.thrown.js: wrong exception for property access on null");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.TypeError.thrown.js: no exception for property access on null");
}

if (ok == 9) {
  console.log("es3.global.TypeError.thrown.js: OK");
} else {
  console.log("es3.global.TypeError.thrown.js: FAIL");
}
