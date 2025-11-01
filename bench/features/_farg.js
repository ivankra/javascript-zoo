// Standard: ES1 15.3.5 Properties of Function Instances
// Standard: ES1 15.3.5.3 arguments
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function f(a, b, c) {
  if (f.arguments[0] == 1 && f.arguments[1] == 2 && f.arguments[2] == 3) {
    console.log("es1.Function.arguments.js: OK");
  } else {
    console.log("es1.Function.arguments.js: FAIL");
  }
};

f(1, 2, 3);
