// print() exists but broken - doesn't print to pipes, breaks testing
if (typeof console !== "undefined" && typeof console.log !== "undefined") {
  globalThis.print = console.log;
}

// Mimick upstream $262
// https://github.com/mozilla/rhino/blob/master/tests/src/test/java/org/mozilla/javascript/tests/Test262SuiteTest.java
globalThis.$262 = {
  gc: function() {
    return gc();
  },
  createRealm: function() {
    var cx = Packages.org.mozilla.javascript.Context.getCurrentContext();
    var realm = cx.initSafeStandardObjects(new Packages.org.mozilla.javascript.TopLevel());
    cx.evaluateString(realm, $SOURCE, "<prelude>", 1, null);
    return realm.$262;
  },
  evalScript: function(source) {
    var cx = Packages.org.mozilla.javascript.Context.getCurrentContext();
    return cx.evaluateString(this.global, String(source), "<evalScript>", 1, null);
  },
  detachArrayBuffer: function(buf) {
    if (buf && typeof buf.transfer === "function") {
      buf.transfer(0);
    }
  },
  global: globalThis,
};
