const componentVNodeHooks = {
  init(vnode, hydrating, parentElm, refElm) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      const child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      )
      child.$mount(hydrating ? vnode.elm : undefined)
    } else if (vnode.data.keepAlive) {
      const mountedNode = vnode
      componentVNodeHooks.prepatch(mountedNode, mountedNode)
    }
  },

  prepatch(oldVnode, vnode) {
    const options = vnode.componentOptions
    const child = vnode.componentInstance = oldVnode.componentInstance
    updateChildComponent(
      child,
      options.propsData,
      options.listeners,
      vnode,
      options.children
    )
  },

  insert(vnode) {
    const { context, componentInstance } = vnode
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true
      callHook(componentInstance, 'mounted')
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        queueActivatedComponent(componentInstance)
      } else {
        activateChildComponent(componentInstance, true)
      }
    }
  },

  destroy(vnode) {
    const { componentInstance } = vnode
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy()
      } else {
        deactivateChildComponent(componentInstance, true)
      }
    }
  }
}

const hooksToMerge = Object.keys(componentVNodeHooks)

export function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return
  }

  const baseCtor = context.$options._base

  if (!isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor)
  }

  if (typeof Ctor !== 'function') {
    throw new Error(`Invalid Component definition: ${String(Ctor)}`)
  }

  // why undef cid is async component
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context)
    if (Ctor === undefined) {
      return
    }
  }

  resoveConstructorOptions(Ctor)

  data = data || {}

  if (isDef(data.model)) {
    transformModel(Ctor.options, data)
  }

  const propsData = extractPropsFromVNodeData(data, Ctor, tag)

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  const listeners = data.on
  data.on = data.nativeOn

  if (isTrue(Ctor.options.abstract)) {
    data = {}
  }

  mergeHooks(data)

  const name = Ctor.options.name || tag
  const vnode = new vnode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data,
    undefined,
    undefined,
    undefined,
    context,
    { Ctor, propsData, listeners, tag, children }
  )
  return vnode
}


export function createComponentInstanceForVnode(
  vnode,
  parent,
  parentElm,
  refElm
) {
  const vnodeComponentOptions = vnode.componentOptions
  const options = {
    _isComponent: true,
    parent,
    propsData: vnodeComponentOptions.propsData,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  }

  const inlineTemplate = vnode.data.inlineTemplate

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render
    options.staticRenderFns = inlineTemplate.staticRenderFns
  }
  return new vnodeComponentOptions.Ctor(options)
}