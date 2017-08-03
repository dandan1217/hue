import config from '../config'
import VNode, { createEmptyVNode } from './vnode'
import { createComponent } from './create-component'


export function createElement(
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
}