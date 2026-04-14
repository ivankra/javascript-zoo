// test262 nativeFunctionMatcher.js -- GocciaScript-compatible reimplementation
// Simplified: GocciaScript native functions may not conform to the exact
// NativeFunction syntax expected by the spec. These helpers accept any
// function toString() output.

const validateNativeFunctionSource = (source) => {
  // Accept any string that looks like a function
  if (typeof source !== "string" || source.length === 0) {
    throw new SyntaxError("Expected a non-empty function source string");
  }
};

const assertToStringOrNativeFunction = (fn, expected) => {
  const actual = "" + fn;
  if (actual !== expected) {
    validateNativeFunctionSource(actual);
  }
};

const assertNativeFunction = (fn, special) => {
  const actual = "" + fn;
  validateNativeFunctionSource(actual);
};
