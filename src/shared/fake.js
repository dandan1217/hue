/* @flow */

export function callHook(vm, hook) {
  console.log(vm, 'callHook - ' + hook)
}

export function activeChildComponent(vm) {
  console.log(vm, "activeChildComponent")
}

export function handleError(err, vm, info) {
  console.error(err, vm, info)
}

export function warn(msg, vm) {
  console.error(`[Hue warn]: ${msg}`, vm)
}