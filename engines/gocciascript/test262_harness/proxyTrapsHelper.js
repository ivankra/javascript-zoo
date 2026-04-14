// test262 proxyTrapsHelper -- GocciaScript-compatible reimplementation
// Provides utility for testing Proxy handler traps.

const allowProxyTraps = {
  getPrototypeOf: undefined,
  setPrototypeOf: undefined,
  isExtensible: undefined,
  preventExtensions: undefined,
  getOwnPropertyDescriptor: undefined,
  defineProperty: undefined,
  has: undefined,
  get: undefined,
  set: undefined,
  deleteProperty: undefined,
  ownKeys: undefined,
  apply: undefined,
  construct: undefined,
};
