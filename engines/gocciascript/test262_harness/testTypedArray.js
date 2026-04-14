// test262 testTypedArray.js -- GocciaScript-compatible reimplementation
// Provides TypedArray constructor lists and iteration helpers.

const floatArrayConstructors = [
  Float64Array,
  Float32Array,
  Float16Array,
];

const nonClampedIntArrayConstructors = [
  Int32Array,
  Int16Array,
  Int8Array,
  Uint32Array,
  Uint16Array,
  Uint8Array,
];

const intArrayConstructors = [...nonClampedIntArrayConstructors, Uint8ClampedArray];

const typedArrayConstructors = [...floatArrayConstructors, ...intArrayConstructors];

const bigIntArrayConstructors = [BigInt64Array, BigUint64Array];

const allTypedArrayConstructors = [...typedArrayConstructors, ...bigIntArrayConstructors];

const TypedArray = Object.getPrototypeOf(Int8Array);

const isPrimitive = (val) => {
  return !val || (typeof val !== "object" && typeof val !== "function");
};

const makePassthrough = (TA, primitiveOrIterable) => {
  return primitiveOrIterable;
};

const makeArray = (TA, primitiveOrIterable) => {
  if (isPrimitive(primitiveOrIterable)) {
    const n = Number(primitiveOrIterable);
    if (!(n >= 0 && n < 9007199254740992)) { return primitiveOrIterable; }
    return Array.from({ length: n }, () => "0");
  }
  return Array.from(primitiveOrIterable);
};

const makeArrayLike = (TA, primitiveOrIterable) => {
  const arr = makeArray(TA, primitiveOrIterable);
  if (isPrimitive(arr)) { return arr; }
  const obj = { length: arr.length };
  const entries = arr.entries();
  for (const [i, v] of entries) {
    obj[i] = v;
  }
  return obj;
};

const makeIterable = (TA, primitiveOrIterable) => {
  const src = makeArray(TA, primitiveOrIterable);
  if (isPrimitive(src)) { return src; }
  const obj = {};
  obj[Symbol.iterator] = () => src[Symbol.iterator]();
  return obj;
};

const makeArrayBuffer = (TA, primitiveOrIterable) => {
  const arr = makeArray(TA, primitiveOrIterable);
  if (isPrimitive(arr)) { return arr; }
  return new TA(arr).buffer;
};

const typedArrayCtorArgFactories = [
  makePassthrough,
  makeArray,
  makeArrayLike,
  makeIterable,
  makeArrayBuffer,
];

const testWithAllTypedArrayConstructors = (f, constructors, includeArgFactories, excludeArgFactories) => {
  const ctors = constructors || allTypedArrayConstructors;
  let ctorArgFactories = typedArrayCtorArgFactories;

  if (includeArgFactories) {
    ctorArgFactories = typedArrayCtorArgFactories.filter(
      (factory) => includeArgFactories.includes("passthrough") && factory === makePassthrough ||
                   includeArgFactories.includes("arraylike") && (factory === makeArray || factory === makeArrayLike) ||
                   includeArgFactories.includes("iterable") && factory === makeIterable ||
                   includeArgFactories.includes("arraybuffer") && factory === makeArrayBuffer
    );
  }

  if (excludeArgFactories) {
    ctorArgFactories = ctorArgFactories.filter(
      (factory) => !(excludeArgFactories.includes("passthrough") && factory === makePassthrough ||
                     excludeArgFactories.includes("arraylike") && (factory === makeArray || factory === makeArrayLike) ||
                     excludeArgFactories.includes("iterable") && factory === makeIterable ||
                     excludeArgFactories.includes("arraybuffer") && factory === makeArrayBuffer)
    );
  }

  if (ctorArgFactories.length === 0) {
    throw new Test262Error("no arg factories match the given filters");
  }

  for (const argFactory of ctorArgFactories) {
    for (const constructor of ctors) {
      const boundArgFactory = (arg) => argFactory(constructor, arg);
      try {
        f(constructor, boundArgFactory);
      } catch (e) {
        e.message = (e.message || "") + " (Testing with " + constructor.name + ".)";
        throw e;
      }
    }
  }
};

const testWithTypedArrayConstructors = (f, constructors, includeArgFactories, excludeArgFactories) => {
  const ctors = constructors || typedArrayConstructors;
  testWithAllTypedArrayConstructors(f, ctors, includeArgFactories, excludeArgFactories);
};

const testWithBigIntTypedArrayConstructors = (f, constructors, includeArgFactories, excludeArgFactories) => {
  const ctors = constructors || bigIntArrayConstructors;
  testWithAllTypedArrayConstructors(f, ctors, includeArgFactories, excludeArgFactories);
};

const nonAtomicsFriendlyTypedArrayConstructors = [...floatArrayConstructors, Uint8ClampedArray];

const testWithNonAtomicsFriendlyTypedArrayConstructors = (f) => {
  testWithTypedArrayConstructors(f, nonAtomicsFriendlyTypedArrayConstructors);
};

const testWithAtomicsFriendlyTypedArrayConstructors = (f) => {
  testWithTypedArrayConstructors(f, [
    Int32Array,
    Int16Array,
    Int8Array,
    Uint32Array,
    Uint16Array,
    Uint8Array,
    BigInt64Array,
    BigUint64Array,
  ]);
};

const testTypedArrayConversions = (byteConversionValues, fn) => {
  const values = byteConversionValues.values;
  const expected = byteConversionValues.expected;

  testWithTypedArrayConstructors((TA) => {
    const name = TA.name.slice(0, -5);
    for (const [index, value] of values.entries()) {
      const exp = expected[name][index];
      let initial = 0;
      if (exp === 0) {
        initial = 1;
      }
      fn(TA, value, exp, initial);
    }
  });
};

const isFloatTypedArrayConstructor = (arg) => {
  return floatArrayConstructors.indexOf(arg) !== -1;
};

const floatTypedArrayConstructorPrecision = (FA) => {
  if (FA === Float16Array) {
    return "half";
  } else if (FA === Float32Array) {
    return "single";
  } else if (FA === Float64Array) {
    return "double";
  }
  throw new Error("floatTypedArrayConstructorPrecision called with non-float TypedArray");
};
