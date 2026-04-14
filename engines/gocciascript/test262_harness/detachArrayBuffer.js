// test262 detachArrayBuffer.js -- GocciaScript-compatible reimplementation
// Provides $262.detachArrayBuffer() using ArrayBuffer.prototype.transfer().

const $262 = {
  detachArrayBuffer: (buffer) => {
    if (!(buffer instanceof ArrayBuffer) && !(buffer instanceof SharedArrayBuffer)) {
      throw new TypeError("$262.detachArrayBuffer requires an ArrayBuffer or SharedArrayBuffer");
    }
    // transfer() detaches the source buffer as a side-effect
    buffer.transfer(0);
  },
  createRealm: () => {
    throw new Test262Error("$262.createRealm is not supported");
  },
  gc: () => {
    // no-op: GocciaScript has no manual GC trigger
  },
};
