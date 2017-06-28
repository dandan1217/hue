/* @flow */

export function callHook(vm, hook) {
  console.log(vm, 'callHook - ' + hook)
}

export function activeChildComponent(vm) {
  console.log(vm, "activeChildComponent")
}

export function handleError(err, vm, info) {
  console.err(err, vm, info)
}