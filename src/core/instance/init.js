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

function initInternalComponent(vm, options) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  opts.parent = options.parent
  opts._parentVnode = options._parentVnode
  opts._parentListeners = options._parentListeners
  opts._renderChildren = options._renderChildren
  opts._componentTag = options._componentTag
  opts._parentElm = options._parentElm
  opts._refElm = options._refElm
  if(options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}