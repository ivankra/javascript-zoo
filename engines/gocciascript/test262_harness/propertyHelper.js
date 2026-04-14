// test262 propertyHelper.js -- GocciaScript-compatible reimplementation
// Provides verifyProperty and related helpers for checking property descriptors.

const verifyProperty = (obj, name, desc, options) => {
  // When test262 tests use `this` expecting the global object but the harness
  // wraps them in an arrow function, `this` is undefined.  Fall back to
  // globalThis so property-descriptor tests still work.
  const target = obj ?? globalThis;
  const actual = Object.getOwnPropertyDescriptor(target, name);

  if (actual === undefined) {
    throw new Test262Error(
      "Expected property '" + String(name) + "' to exist on object"
    );
  }

  if ("value" in desc) {
    if (!assert._isSameValue(actual.value, desc.value)) {
      throw new Test262Error(
        "Expected " + String(name) + ".value to be " +
        String(desc.value) + " but got " + String(actual.value)
      );
    }
  }

  if ("writable" in desc) {
    if (actual.writable !== desc.writable) {
      throw new Test262Error(
        "Expected " + String(name) + ".writable to be " +
        String(desc.writable) + " but got " + String(actual.writable)
      );
    }
  }

  if ("enumerable" in desc) {
    if (actual.enumerable !== desc.enumerable) {
      throw new Test262Error(
        "Expected " + String(name) + ".enumerable to be " +
        String(desc.enumerable) + " but got " + String(actual.enumerable)
      );
    }
  }

  if ("configurable" in desc) {
    if (actual.configurable !== desc.configurable) {
      throw new Test262Error(
        "Expected " + String(name) + ".configurable to be " +
        String(desc.configurable) + " but got " + String(actual.configurable)
      );
    }
  }

  if ("get" in desc) {
    if (actual.get !== desc.get) {
      throw new Test262Error(
        "Expected " + String(name) + ".get to match"
      );
    }
  }

  if ("set" in desc) {
    if (actual.set !== desc.set) {
      throw new Test262Error(
        "Expected " + String(name) + ".set to match"
      );
    }
  }
};

const verifyNotEnumerable = (obj, name) => {
  const desc = Object.getOwnPropertyDescriptor(obj ?? globalThis, name);
  if (desc === undefined) {
    throw new Test262Error(
      "Expected property '" + String(name) + "' to exist on object"
    );
  }
  if (desc.enumerable) {
    throw new Test262Error(
      "Expected " + String(name) + " to not be enumerable"
    );
  }
};

const verifyEnumerable = (obj, name) => {
  const desc = Object.getOwnPropertyDescriptor(obj ?? globalThis, name);
  if (!desc || !desc.enumerable) {
    throw new Test262Error(
      "Expected " + String(name) + " to be enumerable"
    );
  }
};

const verifyNotWritable = (obj, name) => {
  const desc = Object.getOwnPropertyDescriptor(obj ?? globalThis, name);
  if (desc === undefined) {
    throw new Test262Error(
      "Expected property '" + String(name) + "' to exist on object"
    );
  }
  if (desc.writable) {
    throw new Test262Error(
      "Expected " + String(name) + " to not be writable"
    );
  }
};

const verifyWritable = (obj, name) => {
  const desc = Object.getOwnPropertyDescriptor(obj ?? globalThis, name);
  if (!desc || !desc.writable) {
    throw new Test262Error(
      "Expected " + String(name) + " to be writable"
    );
  }
};

const verifyNotConfigurable = (obj, name) => {
  const desc = Object.getOwnPropertyDescriptor(obj ?? globalThis, name);
  if (desc === undefined) {
    throw new Test262Error(
      "Expected property '" + String(name) + "' to exist on object"
    );
  }
  if (desc.configurable) {
    throw new Test262Error(
      "Expected " + String(name) + " to not be configurable"
    );
  }
};

const verifyConfigurable = (obj, name) => {
  const desc = Object.getOwnPropertyDescriptor(obj ?? globalThis, name);
  if (!desc || !desc.configurable) {
    throw new Test262Error(
      "Expected " + String(name) + " to be configurable"
    );
  }
};

const isConfigurable = (obj, name) => {
  const desc = Object.getOwnPropertyDescriptor(obj ?? globalThis, name);
  return desc !== undefined && desc.configurable === true;
};

const isEnumerable = (obj, name) => {
  const desc = Object.getOwnPropertyDescriptor(obj ?? globalThis, name);
  return desc !== undefined && desc.enumerable === true;
};

const isWritable = (obj, name) => {
  const desc = Object.getOwnPropertyDescriptor(obj ?? globalThis, name);
  return desc !== undefined && desc.writable === true;
};
