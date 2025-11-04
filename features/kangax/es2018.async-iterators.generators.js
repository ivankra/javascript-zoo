// ES6: https://github.com/tc39/proposal-async-iteration
// compat-table: ES2016+ > 2018 features > Asynchronous Iterators (medium) > async generators
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
  console.log("es2018.async-iterators.generators.js: OK");
}

function testCode() {
  async function*generator() {
    yield 42;
  }

  var iterator = generator();
  iterator.next().then(function (step) {
    if(iterator[Symbol.asyncIterator]() === iterator && step.done === false && step.value === 42)asyncTestPassed();
  });
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("es2018.async-iterators.generators.js: FAIL: " + e);
}