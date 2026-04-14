// test262 isConstructor.js — uses Reflect.construct to test [[Construct]]
// Matches the official test262 harness: uses newTarget parameter to avoid
// actually invoking the target's constructor logic.

const isConstructor = (f) => {
  if (typeof f !== "function") {
    return false;
  }
  try {
    Reflect.construct(class {}, [], f);
    return true;
  } catch (e) {
    return false;
  }
};
