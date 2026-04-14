// test262 assert API -- GocciaScript-compatible reimplementation
// Bridges test262 assertions to Goccia TestAssertions (expect()) where
// semantics align, with manual SameValue handling for NaN / +0/-0 edges.
//
// Uses only GocciaScript-compatible syntax:
//   - const/let (no var)
//   - arrow functions (no function keyword)
//   - === / !== (no == / !=)
//   - for...of (no traditional loops)
//   - semicolons required
//
// Goccia TestAssertions integration:
//   - assert.throws  --> expect(fn).toThrow(ErrorConstructor)
//   - assert         --> expect(val).toBe(true)
//   - describe/test  --> wrapping provided by the runner

class Test262Error {
  constructor(message) {
    this.message = message || "";
    this.name = "Test262Error";
  }

  toString() {
    return "Test262Error: " + this.message;
  }
}

const $DONOTEVALUATE = () => {
  throw new Test262Error("Test262: This statement should not be evaluated.");
};

const $ERROR = (message) => {
  throw new Test262Error(message);
};

// --- Core assert: bridges to expect().toBe(true) ---
const assert = (mustBeTrue, message) => {
  expect(mustBeTrue).toBe(true);
};

// --- SameValue helper (ES2026 Object.is semantics) ---
// NaN === NaN is true, +0 !== -0  (differs from ===)
assert._isSameValue = (a, b) => {
  if (a === b) {
    if (a === 0) {
      return 1 / a === 1 / b;
    }
    return true;
  }
  if (a !== a && b !== b) {
    return true;
  }
  return false;
};

// --- assert.sameValue: manual SameValue, expect() on failure path ---
assert.sameValue = (actual, expected, message) => {
  if (assert._isSameValue(actual, expected)) {
    return;
  }
  // For non-NaN, non-zero cases, delegate to expect() for rich error messages
  if (actual === actual && expected === expected &&
      !(actual === 0 && expected === 0)) {
    expect(actual).toBe(expected);
    return;
  }
  // NaN or +0/-0 edge: manual throw with descriptive message
  throw new Test262Error(
    (message ? message + " -- " : "") +
    "Expected SameValue(" + String(actual) + ", " + String(expected) + ") to be true"
  );
};

// --- assert.notSameValue ---
assert.notSameValue = (actual, unexpected, message) => {
  if (!assert._isSameValue(actual, unexpected)) {
    return;
  }
  // For non-NaN, non-zero cases, delegate to expect() for rich error messages
  if (actual === actual && unexpected === unexpected &&
      !(actual === 0 && unexpected === 0)) {
    expect(actual).not.toBe(unexpected);
    return;
  }
  throw new Test262Error(
    (message ? message + " -- " : "") +
    "Expected SameValue(" + String(actual) + ", " + String(unexpected) + ") to be false"
  );
};

// --- assert.throws: bridges to expect(fn).toThrow(ErrorConstructor) ---
assert.throws = (expectedErrorConstructor, func, message) => {
  expect(func).toThrow(expectedErrorConstructor);
};

// --- assert.compareArray: uses expect() for length, manual SameValue per element ---
assert.compareArray = (actual, expected, message) => {
  expect(Array.isArray(actual)).toBe(true);
  expect(Array.isArray(expected)).toBe(true);
  expect(actual.length).toBe(expected.length);
  const entries = actual.entries();
  for (const [i, val] of entries) {
    if (!assert._isSameValue(val, expected[i])) {
      throw new Test262Error(
        (message ? message + " -- " : "") +
        "Array elements differ at index " + i + ": " +
        String(val) + " vs " + String(expected[i])
      );
    }
  }
};
