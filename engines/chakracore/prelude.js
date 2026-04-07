if (typeof $262 !== "object") {
  globalThis.$262 = {};
}

if (typeof WScript === "object") {
  if (typeof $262.global === "undefined") {
    $262.global = globalThis;
  }

  // Requires -CollectGarbage flag
  if (typeof $262.gc === "undefined" && typeof CollectGarbage === "function") {
    $262.gc = function() { CollectGarbage(); };
  }

  if (typeof $262.createRealm === "undefined" && typeof WScript.LoadScript === "function") {
    $262.createRealm = function() {
      var realm = WScript.LoadScript($SOURCE, 'samethread');
      return realm.$262;
    }
  }

  if (typeof $262.evalScript === "undefined" && typeof WScript.LoadScript === "function") {
    $262.evalScript = function(s) { WScript.LoadScript(String(s)); };
  }

  if (typeof $262.detachArrayBuffer === "undefined" && typeof WScript.SerializeObject === "function") {
    $262.detachArrayBuffer = function(buf) { WScript.SerializeObject({}, [buf]); };
  }
}
