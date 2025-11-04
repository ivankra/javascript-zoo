// ES6: https://github.com/tc39/proposal-async-iterator-helpers
// compat-table: ES Next > Stage 2 > Async Iterator Helpers (large) > AsyncIterator.prototype.flatMap
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
  console.log("esnext.AsyncIterator.prototype.flatMap.js: OK");
}

function testCode() {
  async function toArray(iterator) {
    const result = [];
    for await (const it of iterator) result.push(it);
    return result;
  }

  toArray(async function*() { yield * [1, 2, 3] }().flatMap(it => [it, 0])).then(it => {
    if (it.join() === '1,0,2,0,3,0') asyncTestPassed();
  });
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("esnext.AsyncIterator.prototype.flatMap.js: FAIL: " + e);
}