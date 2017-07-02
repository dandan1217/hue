/* @flow */

import { handleError } from 'shared/fake'


const callbacks = []
const p = Promise.resolve()

let pending = false

function nextTickHandler() {
  pending = false
  const copies = callbacks.slice()
  callbacks.length = 0
  for (let i = 0, l = copies.length; i < l; i++) {
    copies[i]()
  }
}


function logError(err) {
  console.error(err)
}


export default function nextTick(cb, ctx) {
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

  
  if (!pending) {
    pending = true
    p.then(nextTickHandler).catch(logError)
  }
  if (!cb) {
    return new Promise((resolve, reject) => {
      _resolve = resolve
    });
  }
}