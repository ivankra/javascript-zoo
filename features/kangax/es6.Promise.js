// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// compat-table: ES6 > built-ins > Promise (large) > basic functionality
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
  console.log("es6.Promise.js: OK");
}

function testCode() {
  var p1 = new Promise(function(resolve, reject) { resolve("foo"); });
  var p2 = new Promise(function(resolve, reject) { reject("quux"); });
  var score = 0;

  function thenFn(result)  { score += (result === "foo");  check(); }
  function catchFn(result) { score += (result === "quux"); check(); }
  function shouldNotRun(result)  { score = -Infinity;   }

  p1.then(thenFn, shouldNotRun);
  p2.then(shouldNotRun, catchFn);
  p1.catch(shouldNotRun);
  p2.catch(catchFn);

  p1.then(function() {
    // Promise.prototype.then() should return a new Promise
    score += p1.then() !== p1;
    check();
  });

  function check() {
    if (score === 4) asyncTestPassed();
  }
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("es6.Promise.js: FAIL: " + e);
}