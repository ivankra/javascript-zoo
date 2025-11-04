// ES6: https://github.com/tc39/proposal-explicit-resource-management
// compat-table: ES Next > Stage 3 > Explicit Resource Management (large) > AsyncDisposableStack
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var jobQueue = [];

function setTimeout(cb, time, cbarg) {
  var speedup = 10;
  var runTime = Date.now() + time/speedup;
  if (!jobQueue[runTime]) {
    jobQueue[runTime] = [];
  }
  jobQueue[runTime].push(function() {
    cb(cbarg);
  });
}

function flushQueue() {
  var curTime = Date.now();
  var empty = true;
  for (var runTime in jobQueue) {
    empty = false;
    if (curTime >= runTime) {
      var jobs = jobQueue[runTime];
      delete jobQueue[runTime];
      jobs.forEach(function (job) {
        job();
      });
    }
  }
  if (!empty) {
    Promise.resolve().then(flushQueue);
  }
}

function asyncTestPassed() {
  console.log("esnext.AsyncDisposableStack.js: OK");
}

function testCode() {
  var stack1 = new AsyncDisposableStack();
  var resource1 = { disposed: false };
  var resource2 = { disposed: false };
  var resource3 = { disposed: false, async [Symbol.asyncDispose]() { this.disposed = true } };
  var adopted = stack1.adopt(resource1, async function (r) { r.disposed = true });
  var deferred = stack1.defer(async function (r) { resource2.disposed = true });
  var stack2 = stack1.move();
  var used = stack2.use(resource3);
  stack2.disposeAsync().then(function () {
    resource1.disposed && adopted === resource1 &&
    resource2.disposed && deferred === undefined &&
    resource3.disposed && used === resource3 &&
    asyncTestPassed();
  });
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("esnext.AsyncDisposableStack.js: FAIL: " + e);
}