/* @flow */

let uid = 0

export function initMixin(Hue) {
  Hue.prototype._init = function(options) {
    const vm = this
    vm._uid = uid++
    vm._isHue = true
    if(options && options._isComponent) {
      initInternalComponent(vm, options)
    }
    initProxy(vm)
    vm._self = vm
    initLifeCycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm)
    initState(vm)
    initProvide(vm)
    callHook(vm, 'created')
    vm.$mount(vm.$options.el)
  }
}