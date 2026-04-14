// test262 doneprintHandle.js -- GocciaScript-compatible reimplementation
// Provides $DONE(error) for async test262 tests.
// Works with the describe/test wrapper by creating a Promise that
// the async test function awaits.

const __doneResolvers = Promise.withResolvers();
const __donePromise = __doneResolvers.promise;

const $DONE = (error) => {
  if (error) {
    if (error instanceof Error) {
      __doneResolvers.reject(error);
    } else {
      __doneResolvers.reject(new Test262Error(String(error)));
    }
  } else {
    __doneResolvers.resolve();
  }
};
