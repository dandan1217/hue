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

export function extend(obj, keys, values) {
  for (let i = 0, l = keys.length; i < l; i++) {
    obj[keys[i]] = values[i]
  }
}

export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}