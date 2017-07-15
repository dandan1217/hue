/* @flow */
import {initEvents} from './event'

let uid = 0

export function initMixin(Hue) {
  Hue.prototype._init = function(options) {
    const vm = this
    vm._uid = uid++
    vm._isHue = true
    vm._self = vm
    vm.$options = options || {}
    initEvents(vm)
  }
}