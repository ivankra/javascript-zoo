// ES6: https://github.com/tc39/proposal-async-iteration
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
// compat-table: ES2016+ > 2018 features > Asynchronous Iterators (medium) > for-await-of loops
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
  console.log("es2018.async-iterators.for-await-of.js: OK");
}

function testCode() {
  var asyncIterable = {};
  asyncIterable[Symbol.asyncIterator] = function () {
    var i = 0;
    return {
      next: function () {
        switch(++i) {
          case 1: return Promise.resolve({done: false, value: 'a'});
          case 2: return Promise.resolve({done: false, value: 'b'});
        } return Promise.resolve({done: true});
      }
    };
  };

  (async function () {
    var result = '';
    for await(var value of asyncIterable)result += value;
    if(result === 'ab')asyncTestPassed();
  })();
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("es2018.async-iterators.for-await-of.js: FAIL: " + e);
}