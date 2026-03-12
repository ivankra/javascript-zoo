// Prelude for test262

// hermes-v1 has a built-in partial $262:
// https://github.com/facebook/hermes/blob/static_h/tools/shermes/ConsoleBindings.cpp

// Add gc() method to it if available
if (typeof $262 === 'object' && typeof $262.gc === 'undefined' && typeof globalThis.gc === 'function') {
  $262.gc = globalThis.gc;
}
