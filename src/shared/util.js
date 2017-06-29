/** @flow */

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