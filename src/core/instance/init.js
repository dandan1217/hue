/* @flow */

import { initEvents } from './event'
import { initState } from './state'
import { callHook } from 'shared/fake'

let uid = 0

export function initMixin(Hue) {
  Hue.prototype._init = function (options) {
    const vm = this
    vm._uid = uid++
    vm._isHue = true
    vm._self = vm
    vm.$options = options || {}
    initEvents(vm)
    callHook(vm, 'beforeCreate')
    initState(vm)
    callHook(vm, 'created')
  }
}