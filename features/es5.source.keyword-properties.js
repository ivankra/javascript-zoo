// ES5: 7.6 Identifier Names and Identifiers
// ES5: 11.1.5 Object Initialiser
// compat-table: ES5 > Object/array literal extensions (large) > Reserved words as property names
//
// Identifier->IdentifierName change in ES5's grammar to allow use of keywords/reserved words:
// PropertyName : IdentifierName StringLiteral NumericLiteral
// MemberExpression : MemberExpression . IdentifierName
// CallExpression : CallExpression . IdentifierName
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var o1 = { if: 1 };
if (o1.if === 1) {
  ok++;
} else {
  console.log("es5.source.keyword-properties.js: { if: 1 }.if failed");
}

var o2 = { while: 2, for: 3, do: 4 };
if (o2.while === 2 && o2.for === 3 && o2.do === 4) {
  ok++;
} else {
  console.log("es5.source.keyword-properties.js: loop keywords failed");
}

var o3 = { return: 5, break: 6, continue: 7 };
if (o3.return === 5 && o3.break === 6 && o3.continue === 7) {
  ok++;
} else {
  console.log("es5.source.keyword-properties.js: control flow keywords failed");
}

var o4 = { var: 8, function: 9, new: 10, this: 11 };
if (o4.var === 8 && o4.function === 9 && o4.new === 10 && o4.this === 11) {
  ok++;
} else {
  console.log("es5.source.keyword-properties.js: declaration keywords failed");
}

var o5 = { true: 12, false: 13, null: 14 };
if (o5.true === 12 && o5.false === 13 && o5.null === 14) {
  ok++;
} else {
  console.log("es5.source.keyword-properties.js: literal keywords failed");
}

var o6 = { try: 15, catch: 16, finally: 17, throw: 18 };
if (o6.try === 15 && o6.catch === 16 && o6.finally === 17 && o6.throw === 18) {
  ok++;
} else {
  console.log("es5.source.keyword-properties.js: exception keywords failed");
}

var o7 = { switch: 19, case: 20, default: 21 };
if (o7.switch === 19 && o7.case === 20 && o7.default === 21) {
  ok++;
} else {
  console.log("es5.source.keyword-properties.js: switch keywords failed");
}

var o8 = { typeof: 22, instanceof: 23, in: 24, delete: 25, void: 26 };
if (o8.typeof === 22 && o8.instanceof === 23 && o8.in === 24 && o8.delete === 25 && o8.void === 26) {
  ok++;
} else {
  console.log("es5.source.keyword-properties.js: operator keywords failed");
}

var o9 = { with: 27, debugger: 28 };
if (o9.with === 27 && o9.debugger === 28) {
  ok++;
} else {
  console.log("es5.source.keyword-properties.js: other keywords failed");
}

var o10 = { else: 29 };
if (o10.else === 29) {
  ok++;
} else {
  console.log("es5.source.keyword-properties.js: else keyword failed");
}

if (ok === 10) {
  console.log("es5.source.keyword-properties.js: OK");
} else {
  console.log("es5.source.keyword-properties.js: FAIL");
}
