// compat-table: ES6 > subclassing > Promise is subclassable (small) > basic functionality
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-function-constructor
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
  console.log("kangax-es6/subclassing.Promise.js: OK");
}

function testCode() {
  class P extends Promise {}
  var p1 = new P(function(resolve, reject) { resolve("foo"); });
  var p2 = new P(function(resolve, reject) { reject("quux"); });
  var score = +(p1 instanceof P);

  function thenFn(result)  { score += (result === "foo");  check(); }
  function catchFn(result) { score += (result === "quux"); check(); }
  function shouldNotRun(result)  { score = -Infinity;   }

  p1.then(thenFn, shouldNotRun);
  p2.then(shouldNotRun, catchFn);
  p1.catch(shouldNotRun);
  p2.catch(catchFn);

  p1.then(function() {
    // P.prototype.then() should return a new P
    score += p1.then() instanceof P && p1.then() !== p1;
    check();
  });

  function check() {
    if (score === 5) asyncTestPassed();
  }
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("kangax-es6/subclassing.Promise.js: exception: " + e);
}
