// Prelude for test262

globalThis.print = console.log.bind(console);

globalThis.$262 = {
  global: globalThis,
  gc() {
    return globalThis.$boa.gc.collect();
  },
  createRealm() {
    var realm = globalThis.$boa.realm.create();
    realm.console = console;
    realm.$boa = globalThis.$boa;
    realm.eval($SOURCE);
    return realm.$262;
  },
  evalScript(code) {
    return (0, eval)(code);
  },
  detachArrayBuffer(buffer) {
    structuredClone(buffer, { transfer: [buffer] });
  },
};
