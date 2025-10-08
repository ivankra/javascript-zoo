// stdbuf -oL ./quad-wheel /bench/snowflakes/richards.quad-wheel.js | ts -i %.s

// Copyright 2006-2008 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// This is a JavaScript implementation of the Richards
// benchmark from:
//
//    http://www.cl.cam.ac.uk/~mr10/Bench.html
//
// The benchmark was originally implemented in BCPL by
// Martin Richards.

var print = console.log;

var COUNT = 1000;
var EXPECTED_QUEUE_COUNT = 2322;
var EXPECTED_HOLD_COUNT = 928;

function Scheduler() {
  this.queueCount = 0;
  this.holdCount = 0;
  this.blocks = new Object(); //Array(NUMBER_OF_IDS);
  this.list = null;
  this.currentTcb = null;
  this.currentId = null;
  this.addIdleTask = Scheduler_addIdleTask;
  this.addWorkerTask = Scheduler_addWorkerTask;
  this.addHandlerTask = Scheduler_addHandlerTask;
  this.addDeviceTask = Scheduler_addDeviceTask;
  this.addRunningTask = Scheduler_addRunningTask;
  this.addTask = Scheduler_addTask;
  this.schedule = Scheduler_schedule;
  this.release = Scheduler_release;
  this.holdCurrent = Scheduler_holdCurrent;
  this.suspendCurrent = Scheduler_suspendCurrent;
  this.queue = Scheduler_queue;
};

var ID_IDLE       = 0;
var ID_WORKER     = 1;
var ID_HANDLER_A  = 2;
var ID_HANDLER_B  = 3;
var ID_DEVICE_A   = 4;
var ID_DEVICE_B   = 5;
var NUMBER_OF_IDS = 6;

var KIND_DEVICE   = 0;
var KIND_WORK     = 1;

function Scheduler_addIdleTask(id, priority, queue, count) {
  this.addRunningTask(id, priority, queue, new IdleTask(this, 1, count));
};

function Scheduler_addWorkerTask(id, priority, queue) {
  this.addTask(id, priority, queue, new WorkerTask(this, ID_HANDLER_A, 0));
};

function Scheduler_addHandlerTask(id, priority, queue) {
  this.addTask(id, priority, queue, new HandlerTask(this));
};

function Scheduler_addDeviceTask(id, priority, queue) {
  this.addTask(id, priority, queue, new DeviceTask(this));
};

function Scheduler_addRunningTask(id, priority, queue, task) {
  this.addTask(id, priority, queue, task);
  this.currentTcb.setRunning();
};

function Scheduler_addTask(id, priority, queue, task) {
  this.currentTcb = new TaskControlBlock(this.list, id, priority, queue, task);
  this.list = this.currentTcb;
  this.blocks[id] = this.currentTcb;
};

function Scheduler_schedule() {
  this.currentTcb = this.list;
  while (this.currentTcb != null) {
    if (this.currentTcb.isHeldOrSuspended()) {
      this.currentTcb = this.currentTcb.link;
    } else {
      this.currentId = this.currentTcb.id;
      this.currentTcb = this.currentTcb.run();
    }
  }
};

function Scheduler_release(id) {
  var tcb = this.blocks[id];
  if (tcb == null) return tcb;
  tcb.markAsNotHeld();
  if (tcb.priority > this.currentTcb.priority) {
    return tcb;
  } else {
    return this.currentTcb;
  }
};

function Scheduler_holdCurrent() {
  this.holdCount++;
  this.currentTcb.markAsHeld();
  return this.currentTcb.link;
};

function Scheduler_suspendCurrent () {
  this.currentTcb.markAsSuspended();
  return this.currentTcb;
};

function Scheduler_queue(packet) {
  var t = this.blocks[packet.id];
  if (t == null) return t;
  this.queueCount++;
  packet.link = null;
  packet.id = this.currentId;
  return t.checkPriorityAdd(this.currentTcb, packet);
};

function TaskControlBlock(link, id, priority, queue, task) {
  this.link = link;
  this.id = id;
  this.priority = priority;
  this.queue = queue;
  this.task = task;
  if (queue == null) {
    this.state = STATE_SUSPENDED;
  } else {
    this.state = STATE_SUSPENDED_RUNNABLE;
  }
  this.setRunning = TaskControlBlock_setRunning;
  this.markAsNotHeld = TaskControlBlock_markAsNotHeld;
  this.markAsHeld = TaskControlBlock_markAsHeld;
  this.isHeldOrSuspended = TaskControlBlock_isHeldOrSuspended;
  this.markAsSuspended = TaskControlBlock_markAsSuspended;
  this.markAsRunnable = TaskControlBlock_markAsRunnable;
  this.run = TaskControlBlock_run;
  this.checkPriorityAdd = TaskControlBlock_checkPriorityAdd;
  this.toString = TaskControlBlock_toString;
};

var STATE_RUNNING = 0;

var STATE_RUNNABLE = 1;

var STATE_SUSPENDED = 2;

var STATE_HELD = 4;

var STATE_SUSPENDED_RUNNABLE = STATE_SUSPENDED | STATE_RUNNABLE;
var STATE_NOT_HELD = ~STATE_HELD;

function TaskControlBlock_setRunning() {
  this.state = STATE_RUNNING;
};

function TaskControlBlock_markAsNotHeld() {
  this.state = this.state & STATE_NOT_HELD;
};

function TaskControlBlock_markAsHeld() {
  this.state = this.state | STATE_HELD;
};

function TaskControlBlock_isHeldOrSuspended() {
  return (this.state & STATE_HELD) != 0 || (this.state == STATE_SUSPENDED);
};

function TaskControlBlock_markAsSuspended() {
  this.state = this.state | STATE_SUSPENDED;
};

function TaskControlBlock_markAsRunnable() {
  this.state = this.state | STATE_RUNNABLE;
};

function TaskControlBlock_run() {
  var packet;
  if (this.state == STATE_SUSPENDED_RUNNABLE) {
    packet = this.queue;
    this.queue = packet.link;
    if (this.queue == null) {
      this.state = STATE_RUNNING;
    } else {
      this.state = STATE_RUNNABLE;
    }
  } else {
    packet = null;
  }
  return this.task.run(packet);
};

function TaskControlBlock_checkPriorityAdd(task, packet) {
  if (this.queue == null) {
    this.queue = packet;
    this.markAsRunnable();
    if (this.priority > task.priority) return this;
  } else {
    this.queue = packet.addTo(this.queue);
  }
  return task;
};

function TaskControlBlock_toString() {
  return "tcb { " + this.task + "@" + this.state + " }";
};

function IdleTask(scheduler, v1, count) {
  this.scheduler = scheduler;
  this.v1 = v1;
  this.count = count;
  this.run = IdleTask_run;
  this.toString = IdleTask_toString;
};

function IdleTask_run(packet) {
  this.count--;
  if (this.count == 0) return this.scheduler.holdCurrent();
  if ((this.v1 & 1) == 0) {
    this.v1 = this.v1 >> 1;
    return this.scheduler.release(ID_DEVICE_A);
  } else {
    this.v1 = (this.v1 >> 1) ^ 53256;
    return this.scheduler.release(ID_DEVICE_B);
  }
};

function IdleTask_toString() {
  return "IdleTask";
};

function DeviceTask(scheduler) {
  this.scheduler = scheduler;
  this.v1 = null;
  this.run = DeviceTask_run;
  this.toString = DeviceTask_toString;
};

function DeviceTask_run(packet) {
  if (packet == null) {
    if (this.v1 == null) return this.scheduler.suspendCurrent();
    var v = this.v1;
    this.v1 = null;
    return this.scheduler.queue(v);
  } else {
    this.v1 = packet;
    return this.scheduler.holdCurrent();
  }
};

function DeviceTask_toString() {
  return "DeviceTask";
};

function WorkerTask(scheduler, v1, v2) {
  this.scheduler = scheduler;
  this.v1 = v1;
  this.v2 = v2;
  this.run = WorkerTask_run;
  this.toString = WorkerTask_toString;
};

function WorkerTask_run(packet) {
  if (packet == null) {
    return this.scheduler.suspendCurrent();
  } else {
    if (this.v1 == ID_HANDLER_A) {
      this.v1 = ID_HANDLER_B;
    } else {
      this.v1 = ID_HANDLER_A;
    }
    packet.id = this.v1;
    packet.a1 = 0;
    for (var i = 0; i < DATA_SIZE; i++) {
      this.v2++;
      if (this.v2 > 26) this.v2 = 1;
      packet.a2[i] = this.v2;
    }
    return this.scheduler.queue(packet);
  }
};

function WorkerTask_toString() {
  return "WorkerTask";
};

function HandlerTask(scheduler) {
  this.scheduler = scheduler;
  this.v1 = null;
  this.v2 = null;
  this.run = HandlerTask_run;
  this.toString = HandlerTask_toString;
};

function HandlerTask_run(packet) {
  if (packet != null) {
    if (packet.kind == KIND_WORK) {
      this.v1 = packet.addTo(this.v1);
    } else {
      this.v2 = packet.addTo(this.v2);
    }
  }
  if (this.v1 != null) {
    var count = this.v1.a1;
    var v;
    if (count < DATA_SIZE) {
      if (this.v2 != null) {
        v = this.v2;
        this.v2 = this.v2.link;
        v.a1 = this.v1.a2[count];
        this.v1.a1 = count + 1;
        return this.scheduler.queue(v);
      }
    } else {
      v = this.v1;
      this.v1 = this.v1.link;
      return this.scheduler.queue(v);
    }
  }
  return this.scheduler.suspendCurrent();
};

function HandlerTask_toString() {
  return "HandlerTask";
};

var DATA_SIZE = 4;

function Packet(link, id, kind) {
  this.link = link;
  this.id = id;
  this.kind = kind;
  this.a1 = 0;
  this.a2 = new Array(); //DATA_SIZE);
  this.addTo = Packer_addTo;
  this.toString = Packet_toString();
};

function Packer_addTo(queue) {
  this.link = null;
  if (queue == null) return this;
  var peek, next = queue;
  while ((peek = next.link) != null)
    next = peek;
  next.link = this;
  return queue;
};

function Packet_toString() {
  return "Packet";
};

function runRichards() {
  var scheduler = new Scheduler();
  scheduler.addIdleTask(ID_IDLE, 0, null, COUNT);

  var queue = new Packet(null, ID_WORKER, KIND_WORK);
  queue = new Packet(queue,  ID_WORKER, KIND_WORK);
  scheduler.addWorkerTask(ID_WORKER, 1000, queue);

  queue = new Packet(null, ID_DEVICE_A, KIND_DEVICE);
  queue = new Packet(queue,  ID_DEVICE_A, KIND_DEVICE);
  queue = new Packet(queue,  ID_DEVICE_A, KIND_DEVICE);
  scheduler.addHandlerTask(ID_HANDLER_A, 2000, queue);

  queue = new Packet(null, ID_DEVICE_B, KIND_DEVICE);
  queue = new Packet(queue,  ID_DEVICE_B, KIND_DEVICE);
  queue = new Packet(queue,  ID_DEVICE_B, KIND_DEVICE);
  scheduler.addHandlerTask(ID_HANDLER_B, 3000, queue);

  scheduler.addDeviceTask(ID_DEVICE_A, 4000, null);

  scheduler.addDeviceTask(ID_DEVICE_B, 5000, null);

  scheduler.schedule();

  if (scheduler.queueCount != EXPECTED_QUEUE_COUNT ||
      scheduler.holdCount != EXPECTED_HOLD_COUNT) {
    var msg =
        "Error during execution: queueCount = " + scheduler.queueCount +
        ", holdCount = " + scheduler.holdCount + ".";
    print(msg);
  }
};

for (var iter = 1; iter <= 100; iter++) {
  runRichards();
  print('Finished iteration ' + iter);
}
