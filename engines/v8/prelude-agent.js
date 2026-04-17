// SPDX-FileCopyrightText: 2017 the V8 project authors
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: BSD 3-Clause

// worker_threads-based $262.agent implementation for Node.js,
// adapted from V8's implementation below.
if (typeof process !== 'undefined' && typeof process.getBuiltinModule === 'function') globalThis.$262.agent = (function () {

var worker_threads = process.getBuiltinModule('worker_threads');

var workers = [];
var i32a = null;
var pendingReports = [];

var SLEEP_LOC         = 0;
var BROADCAST_LOC     = 2;
var WORKER_REPORT_LOC = 3;

function workerScript(script) {
  return `
    var wt = process.getBuiltinModule('worker_threads');
    var { workerData: d, parentPort } = wt;
    var { port, i32a, index } = d;
    var BROADCAST_LOC     = ${BROADCAST_LOC};
    var WORKER_REPORT_LOC = ${WORKER_REPORT_LOC};
    var SLEEP_LOC         = ${SLEEP_LOC};
    var broadcasts = [];
    var pendingReceiver = null;

    function handleBroadcast() {
      if (pendingReceiver && broadcasts.length > 0) {
        var b = broadcasts.shift();
        pendingReceiver(b[0], b[1]);
        pendingReceiver = null;
      }
    }

    parentPort.on('message', function(msg) {
      if (msg.kind === 'broadcast') {
        Atomics.add(i32a, BROADCAST_LOC, 1);
        broadcasts.push([msg.sab, msg.id]);
        handleBroadcast();
      }
    });

    globalThis.$262 = {
      agent: {
        receiveBroadcast: function(fn) { pendingReceiver = fn; handleBroadcast(); },
        report: function(msg) {
          port.postMessage(String(msg));
          Atomics.add(i32a, WORKER_REPORT_LOC + index, 1);
        },
        sleep:        function(s) { Atomics.wait(i32a, SLEEP_LOC, 0, s); },
        leaving:      function()  { process.exit(0); },
        monotonicNow: function()  { return typeof performance !== 'undefined' ? performance.now() : Date.now(); },
      }
    };

    (0, eval)(${JSON.stringify(script)});
  `;
}

var agent = {
  start: function(script) {
    if (i32a === null) i32a = new Int32Array(new SharedArrayBuffer(256));
    var channel = new worker_threads.MessageChannel();
    var w = new worker_threads.Worker(workerScript(script), {
      eval: true,
      workerData: { port: channel.port1, i32a: i32a, index: workers.length },
      transferList: [channel.port1],
    });
    w.reportPort = channel.port2;
    w.index = workers.length;
    w.on('error', function() {});
    workers.push(w);
  },

  broadcast: function(sab, id) {
    if (!(sab instanceof SharedArrayBuffer)) throw new TypeError('sab must be a SharedArrayBuffer.');
    Atomics.store(i32a, BROADCAST_LOC, 0);
    for (var i = 0; i < workers.length; i++) {
      workers[i].postMessage({ kind: 'broadcast', sab: sab, id: id | 0 });
    }
    while (Atomics.load(i32a, BROADCAST_LOC) !== workers.length) {}
  },

  getReport: function() {
    for (var i = 0; i < workers.length; i++) {
      var w = workers[i];
      while (Atomics.load(i32a, WORKER_REPORT_LOC + w.index) > 0) {
        var m = worker_threads.receiveMessageOnPort(w.reportPort);
        if (m) pendingReports.push(m.message);
        Atomics.sub(i32a, WORKER_REPORT_LOC + w.index, 1);
      }
    }
    return pendingReports.shift() || null;
  },

  sleep: function(s) { Atomics.wait(i32a, SLEEP_LOC, 0, s); },

  monotonicNow: function() {
    return typeof performance !== 'undefined' ? performance.now() : Date.now();
  },
};
return agent;

})(); else globalThis.

// $262.agent implementation from V8, copied verbatim:
// https://github.com/v8/v8/blob/main/test/test262/harness-agent.js

// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

$262.agent = (function () {

var workers = [];
var i32a = null;
var pendingReports = [];

// Agents call Atomics.wait on this location to sleep.
var SLEEP_LOC = 0;
// 1 if the started worker is ready, 0 otherwise.
var START_LOC = 1;
// The number of workers that have received the broadcast.
var BROADCAST_LOC = 2;
// Each worker has a count of outstanding reports; worker N uses memory
// location [WORKER_REPORT_LOC + N].
var WORKER_REPORT_LOC = 3;

function workerScript(script) {
  return `
    var index;
    var i32a = null;
    var broadcasts = [];
    var pendingReceiver = null;

    function handleBroadcast() {
      if (pendingReceiver && broadcasts.length > 0) {
        pendingReceiver.apply(null, broadcasts.shift());
        pendingReceiver = null;
      }
    };

    var onmessage = function({data:msg}) {
      switch (msg.kind) {
        case 'start':
          i32a = msg.i32a;
          index = msg.index;
          (0, eval)(\`${script}\`);
          break;

        case 'broadcast':
          Atomics.add(i32a, ${BROADCAST_LOC}, 1);
          broadcasts.push([msg.sab, msg.id]);
          handleBroadcast();
          break;
      }
    };

    var $262 = {
      agent: {
        receiveBroadcast(receiver) {
          pendingReceiver = receiver;
          handleBroadcast();
        },

        report(msg) {
          postMessage(String(msg));
          Atomics.add(i32a, ${WORKER_REPORT_LOC} + index, 1);
        },

        sleep(s) { Atomics.wait(i32a, ${SLEEP_LOC}, 0, s); },

        leaving() {},

        monotonicNow() {
          return performance.now();
        }
      }
    };`;
}

var agent = {
  start(script) {
    if (i32a === null) {
      i32a = new Int32Array(new SharedArrayBuffer(256));
    }
    var w = new Worker(workerScript(script), {type: 'string'});
    w.index = workers.length;
    w.postMessage({kind: 'start', i32a: i32a, index: w.index});
    workers.push(w);
  },

  broadcast(sab, id) {
    if (!(sab instanceof SharedArrayBuffer)) {
      throw new TypeError('sab must be a SharedArrayBuffer.');
    }

    Atomics.store(i32a, BROADCAST_LOC, 0);

    for (var w of workers) {
      w.postMessage({kind: 'broadcast', sab: sab, id: id|0});
    }

    while (Atomics.load(i32a, BROADCAST_LOC) != workers.length) {}
  },

  getReport() {
    for (var w of workers) {
      while (Atomics.load(i32a, WORKER_REPORT_LOC + w.index) > 0) {
        pendingReports.push(w.getMessage());
        Atomics.sub(i32a, WORKER_REPORT_LOC + w.index, 1);
      }
    }

    return pendingReports.shift() || null;
  },

  sleep(s) { Atomics.wait(i32a, SLEEP_LOC, 0, s); },

  monotonicNow() {
    return performance.now();
  }
};
return agent;

})();
