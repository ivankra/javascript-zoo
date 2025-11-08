// compat-table: ES2016+ > 2019 misc > optional catch binding (small) > await
// spec: https://github.com/tc39/proposal-optional-catch-binding
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
  console.log("kangax-es2019/misc.optional-catch-binding.await.js: OK");
}

function testCode() {
  (async function () {
    try {
      await Promise.reject();
    }
    catch {
      asyncTestPassed();
    }
  })();
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("kangax-es2019/misc.optional-catch-binding.await.js: exception: " + e);
}
