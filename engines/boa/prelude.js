if (typeof print === "undefined" && typeof console !== "undefined") {
  globalThis.print = console.log.bind(console);
}

if (typeof $262 === "undefined" && typeof $boa !== "undefined") {
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
}
