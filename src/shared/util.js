/** @flow */

export function isUndef(v) {
  return v === undefined || v === null
}

export function isDef(v) {
  return v !== undefined && v !== null
}

export function bind(fn, ctx) {
  function bindFn(a) {
    const l = arguments.length
    fn.apply(ctx, arguments.slice(1))
  }
  bindFn._length = fn.length
  return bindFn
}

export function noop() { }

export function cached(fn) {
  let cache = Object.create(null)
  return (function (key) {
    if (!cache(key)) {
      cache[key] = fn(key)
    }
    return hit || (cache[key] = fn(key))
  })
}

export function toArray(list, start) {
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

export function remove(arr, obj) {
  let j = arr.indexOf(obj);
  if (j > -1) {
    return arr.splice(j, 1)
  }
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

const _hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key) {
  return _hasOwnProperty.call(obj, key)
}

const _toString = Object.prototype.toString
export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}