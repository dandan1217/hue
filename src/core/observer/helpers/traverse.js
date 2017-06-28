/* @flow */

import { isObject } from 'shared/util'

const seenObjects = new Set()

function traverse(val) {
  _tarverse(val, seenObjects)
  seenObjects.clear()
}

function _tarverse(val, seen) {
  const isA = Array.isArray(val)

  if ((!isA && !isObject(val)) ||
    !Object.isExtensible(val)) {
    return
  }

  if (val.__ob__) {
    const depId = val.__ob__.dep.id
    seen.add(depId)
  }

  if (isA) {
    let i = val.length
    while (i--) {
      _tarverse(val[i])
    }
  } else {
    let keys = Object.keys(val)
    let i = keys.length
    while (i--) {
      _tarverse(val[keys[i]], seen)
    }
  }

}

export default traverse