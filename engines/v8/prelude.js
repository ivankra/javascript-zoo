// Prelude for test262 for V8's d8 shell

if (typeof print === "undefined" && typeof console !== "undefined") {
  globalThis.print = console.log.bind(console);  // for nodejs
}

globalThis.$262 = {
  global: globalThis,
  realmId: typeof Realm !== "undefined" && typeof Realm.current !== "undefined" ? Realm.current() : undefined,

  gc() {
    if (typeof globalThis.gc === "function") {
      gc();    // requires --expose-gc
    } else if (typeof globalThis.v8GC === "function") {
      v8GC();  // requires --expose-gc-as=v8GC
    } else {
      // INTERPRETING.md: "Must throw an exception if no capability exists."
      throw new ReferenceError("gc() not available");
    }
  },

  createRealm() {
    // Will be expanded by assembler.py with a copy of prelude
    // to bootstrap sub-realm (eshost's inception trick)
    var prelude = $SOURCE;
    if (typeof Realm !== "undefined" && typeof Realm.createAllowCrossRealmAccess !== "undefined") {
      var realmId = Realm.createAllowCrossRealmAccess();
      Realm.eval(realmId, prelude);
      return Realm.global(realmId).$262;
    } else if (typeof process !== "undefined" && typeof process.getBuiltinModule !== "undefined") {
      // For nodejs. Do not use require() here as that breaks ES module tests.
      var vm = process.getBuiltinModule("vm");
      var ctx = vm.createContext({ console, print, process });
      vm.runInContext(prelude, ctx);
      ctx.$262.context = ctx;
      return ctx.$262;
    }
  },

  evalScript(code) {
    // Use the realm that owns this $262 object. Realm.current() would run in
    // the caller realm instead, which breaks cross-realm tests like
    // test/built-ins/Proxy/revocable/tco-fn-realm.js.
    if (typeof Realm !== "undefined" && typeof Realm.eval !== "undefined") {
      return Realm.eval(this.realmId, code);
    } else if (typeof process !== "undefined" && typeof process.getBuiltinModule !== "undefined") {
      var vm = process.getBuiltinModule("vm");
      return this.context ? vm.runInContext(code, this.context) : vm.runInThisContext(code);
    } else {
      return (0, eval)(code);
    }
  },

  detachArrayBuffer(buffer) {
    try {
      // Requires --allow-natives-syntax flag
      Function("%ArrayBufferDetach(arguments[0])")(buffer);
    } catch (e) {
      // Alternative fallback
      if (typeof process !== "undefined" && typeof process.getBuiltinModule !== "undefined") {
        var workerThreads = process.getBuiltinModule("node:worker_threads");
        var { port1, port2 } = new node_workerThreads.MessageChannel();
        port2.postMessage(null, [buffer]);
        port1.close();
        port2.close();
      } else {
        var w = new Worker("", { type: "string" });
        w.postMessage("", [buffer]);
      }
    }
  },
};

// Delete d8's shell-global `arguments` for tests like
// test/language/eval-code/direct/func-decl-a-following-parameter-is-named-arguments-declare-arguments-and-assign.js
delete globalThis.arguments;
