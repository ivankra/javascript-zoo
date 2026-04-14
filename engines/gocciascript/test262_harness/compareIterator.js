// test262 compareIterator.js -- GocciaScript-compatible reimplementation
// Provides helpers for comparing iterator results.

const compareIterator = (iter, validators) => {
  let i = 0;
  for (const val of iter) {
    if (i >= validators.length) {
      throw new Test262Error(
        "Iterator produced more values than expected. " +
        "Expected " + validators.length + " values."
      );
    }
    validators[i](val, i);
    i++;
  }
  if (i !== validators.length) {
    throw new Test262Error(
      "Iterator produced " + i + " values but expected " + validators.length
    );
  }
};
