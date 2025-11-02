// ES3: 11.9.4 The Strict Equals Operator ( === )
// ES3: 11.9.5 The Strict Does-not-equal Operator ( !== )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (5 === 5) {
  ok++;
} else {
  console.log("es3.strict-equals.js: number === number failed");
}

if (5 !== 3) {
  ok++;
} else {
  console.log("es3.strict-equals.js: number !== number failed");
}

if ("test" === "test") {
  ok++;
} else {
  console.log("es3.strict-equals.js: string === string failed");
}

if ("foo" !== "bar") {
  ok++;
} else {
  console.log("es3.strict-equals.js: string !== string failed");
}

if (!(5 === "5")) {
  ok++;
} else {
  console.log("es3.strict-equals.js: number === string failed");
}

if (5 !== "5") {
  ok++;
} else {
  console.log("es3.strict-equals.js: number !== string failed");
}

if (!(0 === false)) {
  ok++;
} else {
  console.log("es3.strict-equals.js: 0 === false failed");
}

if (0 !== false) {
  ok++;
} else {
  console.log("es3.strict-equals.js: 0 !== false failed");
}

if (!(null === undefined)) {
  ok++;
} else {
  console.log("es3.strict-equals.js: null === undefined failed");
}

if (null !== undefined) {
  ok++;
} else {
  console.log("es3.strict-equals.js: null !== undefined failed");
}

var obj = new Object();
if (obj === obj) {
  ok++;
} else {
  console.log("es3.strict-equals.js: object === itself failed");
}

var obj1 = new Object();
var obj2 = new Object();
if (!(obj1 === obj2)) {
  ok++;
} else {
  console.log("es3.strict-equals.js: object === different object failed");
}

if (ok == 12) {
  console.log("es3.strict-equals.js: OK");
} else {
  console.log("es3.strict-equals.js: FAIL");
}
