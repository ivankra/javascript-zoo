// compat-table: ES Next > Stage 3 > Explicit Resource Management (large) > await using
// spec: https://github.com/tc39/proposal-explicit-resource-management
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
  console.log("kangax-next/await-using.js: OK");
}

function testCode() {
  (async function () {
    var resource = {
      disposed: false,
      async [Symbol.asyncDispose]() {
        this.disposed = true;
      }
    };
    {
      await using _ = resource;
    }
    return resource.disposed && asyncTestPassed();
  }());
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("kangax-next/await-using.js: exception: " + e);
}
