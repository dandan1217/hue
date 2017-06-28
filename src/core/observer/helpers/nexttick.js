/* @flow */

import {
  handleError
} from 'shared/fake'

const callbacks = []
let pending = false

function nextTickHandler() {
  pending = false
  const copies = callbacks.slice()
  for (let i = 0, l = copies.length; i < l; i++) {
    copies[i]()
  }
  callbacks.length = 0
}

function logError(err) {
  console.error(err)
}

export function nextTick(cb, ctx) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })

  let p = Promise.resolve()
  let timerFunc = p.then(nextTickHandler).catch(logError)
  if (!pending) {
    pending = true
    timerFunc()
  }
  if (!cb) {
    return new Promise((resolve, reject) => {
      _resolve = resolve
    });
  }
}