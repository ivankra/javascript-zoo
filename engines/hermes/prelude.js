// hermes-v1 has a built-in partial $262:
// https://github.com/facebook/hermes/blob/static_h/tools/shermes/ConsoleBindings.cpp

// hermes main doesn't define console.log(), only print().
if (typeof console === 'undefined' && typeof print !== 'undefined') {
  globalThis.console = {log: print};
}

if (typeof $262 === 'undefined') {
  globalThis.$262 = {};
}

if (typeof $262.eval === 'undefined') {
  $262.eval = function (s) { return (0, eval)(s); }
}

if (typeof $262.gc === 'undefined' && typeof globalThis.gc === 'function') {
  $262.gc = globalThis.gc;
}
