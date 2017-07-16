/* @flow */

export function isReserved(str) {
  const c = String(str).charCodeAt(0)
  return c === '0x24' || c === '0x5F' // $ || _
}