// ES3: 15.4.2.2 new Array (len)
// ES3: 15.4.5.1 [[Put]] (P, V)
// ES3: 15.11.6.2 RangeError
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

// ES3: 15.4.2.2 new Array (len)
var caught = 0;
try {
  var a0 = new Array(-1);
} catch (e) {
  if (e.name == "RangeError") {
    ok++;
  } else {
    console.log("es3.global.RangeError.thrown.js: wrong exception for new Array with negative length");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.RangeError.thrown.js: no exception for new Array with negative length");
}

// ES3: 15.4.2.2 new Array (len)
caught = 0;
try {
  var a00 = new Array(1.5);
} catch (e) {
  if (e.name == "RangeError") {
    ok++;
  } else {
    console.log("es3.global.RangeError.thrown.js: wrong exception for new Array with non-integer length");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.RangeError.thrown.js: no exception for new Array with non-integer length");
}

// ES3: 15.4.2.2 new Array (len)
caught = 0;
try {
  var a000 = new Array(4294967296);
} catch (e) {
  if (e.name == "RangeError") {
    ok++;
  } else {
    console.log("es3.global.RangeError.thrown.js: wrong exception for new Array with length >= 2^32");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.RangeError.thrown.js: no exception for new Array with length >= 2^32");
}

// ES3: 15.4.5.1 [[Put]] (P, V)
caught = 0;
var a1 = new Array();
try {
  a1.length = -1;
} catch (e) {
  if (e.name == "RangeError") {
    ok++;
  } else {
    console.log("es3.global.RangeError.thrown.js: wrong exception for negative array length");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.RangeError.thrown.js: no exception for negative array length");
}

// ES3: 15.4.5.1 [[Put]] (P, V)
caught = 0;
var a2 = new Array();
try {
  a2.length = 4294967296;
} catch (e) {
  if (e.name == "RangeError") {
    ok++;
  } else {
    console.log("es3.global.RangeError.thrown.js: wrong exception for array length exceeding 2^32-1");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.RangeError.thrown.js: no exception for array length exceeding 2^32-1");
}

if (ok == 5) {
  console.log("es3.global.RangeError.thrown.js: OK");
} else {
  console.log("es3.global.RangeError.thrown.js: FAIL");
}
