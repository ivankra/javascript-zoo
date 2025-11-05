// compat-table: ES2016+ > 2018 features > Promise.prototype.finally (medium) > basic support
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
  console.log("kangax-es2018/Promise.prototype.finally.js: OK");
}

function testCode() {
  var p1 = Promise.resolve("foo");
  var p2 = Promise.reject("bar");
  var score = 0;
  function thenFn(result) {
    score += (result === "foo");
    check();
  }
  function catchFn(result) {
    score += (result === "bar");
    check();
  }
  function finallyFn() {
    score += (arguments.length === 0);
    check();
  }
  p1.then(thenFn);
  p1.finally(finallyFn);
  p1.finally(function () {
    // should return a new Promise
    score += p1.finally() !== p1;
    check();
  });
  p2.catch (catchFn);
  p2.finally(finallyFn);
  function check() {
    if (score === 5) asyncTestPassed();
  }
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("kangax-es2018/Promise.prototype.finally.js: exception: " + e);
}
