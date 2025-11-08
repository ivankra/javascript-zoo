// compat-table: ES2016+ > 2025 features > Promise.try (tiny)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/try
// spec: https://github.com/tc39/proposal-promise-try
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
  console.log("kangax-es2025/Promise.try.js: OK");
}

function testCode() {
  if (!('try' in Promise)) {
    return false;
  }
  var called = false;
  var argsMatch = false;
  var p = Promise.try(function () { called = true; })
  var p2 = Promise.try(function () {
    'use strict';
    argsMatch = this === undefined && arguments.length === 2 && arguments[0] === p && arguments[1] === 2;
  }, p, 2);

  if (!(p instanceof Promise) || !(p2 instanceof Promise)) {
    return false;
  }

  p2.then(function () {
    if (!called || !argsMatch) {
      return;
    }
    asyncTestPassed();
  });
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("kangax-es2025/Promise.try.js: exception: " + e);
}
