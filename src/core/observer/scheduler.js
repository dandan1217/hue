/* @flow */
import nextTick from './helpers/nexttick'
import { callHook } from 'shared/fake'


const MAX_UPDATE_COUNT = 100

const queue = []
const activatedChildren = []
let has = {}
let circular = {}
let waiting = false
let flushing = false
let index = 0


function resetScheduler() {
  queue.length = activatedChildren.length = 0
  has = {}
  circular = {}
  waiting = flushing = false
}

function flushSchedulerQueue() {
  flushing = true
  queue.sort((a, b) => a.id - b.id)

  for (index = 0; index < queue.length; index++) {
    let watcher = queue[index]
    let id = watcher.id
    has[id] = null
    watcher.run()

    if (has[id] != null) {
      circular[id] = (circular[id] || 0) + 1
      if (circular[id] > MAX_UPDATE_COUNT) {
        throw "inifinite update loop"
      }
    }
  }

  callActivateHooks(activatedChildren.slice())
  callUpdateHooks(queue.slice())
  resetScheduler()
}

function callUpdateHooks(queue) { // watcher
  let i = queue.length
  while (i--) {
    callHook(queue[i].vm, 'updated')
  }
}

function callActivateHooks(queue) { // component
  for (let i = 0; i < queue.length; i++) {
    activeChildComponent(queue[i], true)
  }
}

export function queueActivateComponent(vm) {
  activatedChildren.push(vm)
}

export function schedule(watcher) {
  const id = watcher.id
  if (!has[id]) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      let i = queue.length - 1
      while (i >= 0 && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher)
    }
  }
  if (!waiting) {
    waiting = true
    nextTick(flushSchedulerQueue)
  }
}