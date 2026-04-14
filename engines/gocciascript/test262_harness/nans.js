// test262 nans.js -- GocciaScript-compatible reimplementation
// Provides a list of NaN-producing expressions for testing.

const NaNs = [
  NaN,
  Number.NaN,
  NaN * 0,
  0 / 0,
  Infinity / Infinity,
  -(0 / 0),
];
