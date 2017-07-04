/* @flow */

export function initState(vm) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch) initWatch(vm, opts.watch)
}

function initData(vm) {
  let data = vm.$options.data
  data = vm._data = data || {}
  if (!isPlainObject(data)) {
    throw new Error("data should be plain object", vm)
  }
  observe(data, true)
}

function initMethods(vm, methods) {
  const props = vm.$options.props
  for (const key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm)
    if (vm[key] == null) {
      throw new Error(`method "${key}" has an undefined value in the` +
        ` component definition`,
        vm
      )
    }
  }
}

const computedWatchersOptions = { lazy: true }

function initWatch(vm, watch) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher(vm, key, handler) {
  let options
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  vm.$watch(key, handler, options)
}

export function stateMixin(Hue) {
  const dataDef = {
    get: function () {
      return this._data
    }
  }
  Object.defineProperty(Hue.prototype, '$data', dataDef)

  Hue.prototype.$set = set
  Hue.prototype.$delete = del

  Hue.prototype.$watch = function (fn, cb, options) {
    const vm = this
    options = options || {}
    const watcher = new Watcher(vm, fn, cb, options)
    if (options.immediate) {
      cb.call(vm, watcher.value)
    }
    return function unwatchFn() {
      watcher.teardown()
    }
  }
}