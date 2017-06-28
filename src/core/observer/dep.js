/** @flow */

import {
  remove
} from 'shared/util'

let uid = 0

export default class Dep {

  constructor() {
    this.id = uid++
      this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    remove(this.subs, sub)
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify() {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}


Dep.target = null

const targetStack = []

export function pushTarget(_target) {
  if (Dep.target) {
    targetStack.push(Dep.target)
  }
  target = _target
}

export function popTarget() {
  Dep.target = targetStack.pop()
}