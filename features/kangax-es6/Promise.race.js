// compat-table: ES6 > built-ins > Promise (large) > Promise.race
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects
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
  console.log("kangax-es6/Promise.race.js: OK");
}

function testCode() {
  var fulfills = Promise.race([
    new Promise(function(resolve)   { setTimeout(resolve,1000,"foo"); }),
    new Promise(function(_, reject) { setTimeout(reject, 2000,"bar"); })
  ]);
  var rejects = Promise.race([
    new Promise(function(_, reject) { setTimeout(reject, 1000,"baz"); }),
    new Promise(function(resolve)   { setTimeout(resolve,2000,"qux"); })
  ]);
  var score = 0;
  fulfills.then(function(result) { score += (result === "foo"); check(); });
  rejects.catch(function(result) { score += (result === "baz"); check(); });

  function check() {
    if (score === 2) asyncTestPassed();
  }
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("kangax-es6/Promise.race.js: exception: " + e);
}
