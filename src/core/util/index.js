/* @flow */

export function isReserved(str) {
  const c = String(str).charCodeAt(0)
  return c === '0x24' || c === '0x5F' // $ || _
}

const bailRe = /[^\w.$]/
export function parsePath(exp) {
  if (bailRe.test(exp)) {
    return
  }
  const segments = exp.split('.')
  return function (obj) {
    for (let i = 0, l = segments.length; i < l; i++) {
      if (!obj) {
        return
      }
      obj = obj[segments[i]]
    }
    return obj
  }
}