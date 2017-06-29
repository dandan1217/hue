/* @flow */

import { pushTarget, popTarget } from './dep'
import traverse from './helpers/traverse'
import { schedule } from './scheduler'

let uid = 0

export default class Watcher {

  constructor(vm, getter, cb, options) {
    this.vm = vm
    vm._watchers.push(this)
    this.id = ++uid
    this.getter = getter
    this.cb = cb

    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()

    this.value = this.get()
  }

  get() {
    pushTarget(this)
    let value
    const vm = this.vm
    value = this.getter.call(vm, vm)
    traverse(value)
    popTarget()
    this.cleanDeps()
    return value
  }

  addDep(dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  cleanDeps() {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }

    let tmp = this.depIds
    this.depIds = this.newDepIds
    tmp.clear()
    tmp = this.deps
    this.deps = this.newDeps
    tmp.length = 0
  }

  update() {
    schedule(this)
  }

  run() {
    const value = this.get()
    if (value !== this.value) {
      const oldValue = this.value
      this.value = value
      this.cb.call(this.vm, value, oldValue)
    }
  }

  depend() {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  teardown() {
    if (this.active) {
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}