
export function initProvided(vm) {
  const provide = vm.$options.provide
  if (provide) {
    vm._provide = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
}

export function initInjections(vm) {
  const result = resolveInject(vm.$options.inject, vm)
  if (result) {
    Object.keys.forEach(key => {
      defineReactive(vm, key, result[key])
    })
  }
}

export function resolveInject(inject, vm) {
  if (inject) {
    const isArray = Array.isArray(inject)
    const result = Object.create(null)
    // here hue used Reflect.ownKeys and Object.keys
    // but they are not equivalent, why ?
    const keys = isArray ? inject : Object.keys(inject)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const provideKey = isArray ? key : inject[key]
      let source = vm
      while (source) {
        if (source._provide && provideKey in source._provide) {
          result[key] = source._provide[provideKey]
          break
        }
        source = source.$parent
      }
    }
    return result
  }
}