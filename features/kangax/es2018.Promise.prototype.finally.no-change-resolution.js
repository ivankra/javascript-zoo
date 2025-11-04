// ES6: https://github.com/tc39/proposal-promise-finally
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
// compat-table: ES2016+ > 2018 features > Promise.prototype.finally (medium) > don't change resolution value
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
  console.log("es2018.Promise.prototype.finally.no-change-resolution.js: OK");
}

function testCode() {
  var score = 0;
  function thenFn(result)  {
    score += (result === "foo");
    check();
  }
  function catchFn(result) {
    score += (result === "bar");
    check();
  }
  function finallyFn() {
    score++;
    check();
    return Promise.resolve("foobar");
  }
  Promise.resolve("foo").finally(finallyFn).then(thenFn);
  Promise.reject("bar").finally(finallyFn).catch(catchFn);
  function check() {
    if (score === 4) asyncTestPassed();
  }
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("es2018.Promise.prototype.finally.no-change-resolution.js: FAIL: " + e);
}