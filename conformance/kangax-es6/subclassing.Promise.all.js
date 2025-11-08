// compat-table: ES6 > subclassing > Promise is subclassable (small) > Promise.all
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
  console.log("kangax-es6/subclassing.Promise.all.js: OK");
}

function testCode() {
  class P extends Promise {}
  var fulfills = P.all([
    new Promise(function(resolve)   { setTimeout(resolve,2000,"foo"); }),
    new Promise(function(resolve)   { setTimeout(resolve,1000,"bar"); })
  ]);
  var rejects = P.all([
    new Promise(function(_, reject) { setTimeout(reject, 2000,"baz"); }),
    new Promise(function(_, reject) { setTimeout(reject, 1000,"qux"); })
  ]);
  var score = +(fulfills instanceof P);
  fulfills.then(function(result) { score += (result + "" === "foo,bar"); check(); });
  rejects.catch(function(result) { score += (result === "qux"); check(); });

  function check() {
    if (score === 3) asyncTestPassed();
  }
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("kangax-es6/subclassing.Promise.all.js: exception: " + e);
}
