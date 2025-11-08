// compat-table: ES6 > built-ins > Reflect (small) > Reflect.construct, Promise subclassing
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
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
  console.log("kangax-es6/Reflect.construct.Promise-subclassing.js: OK");
}

function testCode() {
  function F(){}
  var p1 = Reflect.construct(Promise,[function(resolve, reject) { resolve("foo"); }], F);
  var p2 = Reflect.construct(Promise,[function(resolve, reject) { reject("quux"); }], F);
  var score = +(p1 instanceof F && p2 instanceof F);

  function thenFn(result)  { score += (result === "foo");  check(); }
  function catchFn(result) { score += (result === "quux"); check(); }
  function shouldNotRun(result)  { score = -Infinity;   }

  p1.then = p2.then = Promise.prototype.then;
  p1.catch = p2.catch = Promise.prototype.catch;

  p1.then(thenFn, shouldNotRun);
  p2.then(shouldNotRun, catchFn);
  p1.catch(shouldNotRun);
  p2.catch(catchFn);

  function check() {
    if (score === 4) asyncTestPassed();
  }
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("kangax-es6/Reflect.construct.Promise-subclassing.js: exception: " + e);
}
