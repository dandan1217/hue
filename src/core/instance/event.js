/* @flow */

import { toArray } from 'shared/util'
import { updateListeners } from 'vdom/helpers/update-listeners.js'

let target

export function initEvents(vm) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false

  const listeners = vm.$options.listeners // why vue use parentListers
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}

function add(event, fn, once) {
  if (once) {
    target.$once(event, fn)
  } else {
    target.$on(event, fn)
  }
}

function remove(event, fn) {
  target.$off(event, fn)
}

export function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm
  updateListeners(listeners, oldListeners || [], add, remove, vm)
}

export function eventsMixin(Hue) {
  Hue.prototype.$on = function (event, fn) {
    const vm = this
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$on(event, fn)
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn)

    }
    return vm
  }

  Hue.prototype.$off = function (event, fn) {
    if (!arguments.length) {
      vm._events = Object.create(null)
      return vm
    }
    const vm = this

    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$ff(event, fn)
      }
    }

    const cbs = vm._events[event]
    if (!cbs) {
      return vm
    }

    if (arguments.length === 1) {
      vm._events[event] = null
      return vm
    }

    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return vm
  }

  Hue.prototype.$once = function (event, fn) {
    const vm = this
    function on() {
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    vm.$on(event, on)
    return vm
  }

  Hue.prototype.$emit = function (event) {
    const vm = this
    let cbs = vm._events[event]
    if (cbs) {
      const args = toArray(arguments, 1)
      for (let i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args)
      }
    }
    return vm
  }
}
