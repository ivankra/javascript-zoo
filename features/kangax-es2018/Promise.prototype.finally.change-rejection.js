// compat-table: ES2016+ > 2018 features > Promise.prototype.finally (medium) > change rejection value
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
// spec: https://github.com/tc39/proposal-promise-finally
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
  console.log("kangax-es2018/Promise.prototype.finally.change-rejection.js: OK");
}

function testCode() {
  var score = 0;
  Promise
    .reject("foobar")
    .finally(function () {
      return Promise.reject("foo");
    })
    .catch (function (result) {
      score += (result === "foo");
      check();
      return Promise.reject("foobar");
    })
    .finally(function () {
      throw new Error('bar');
    })
    .catch (function (result) {
      score += (result.message === "bar");
      check();
    });
  function check() {
    if (score === 2) asyncTestPassed();
  }
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("kangax-es2018/Promise.prototype.finally.change-rejection.js: exception: " + e);
}
