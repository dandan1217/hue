import { extend } from 'shared/util'
import { Dep } from './dep'

export class Observer {

  constructor(value) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    value.__ob__ = this

    if(Array.isArray(value)) {
      extend(value, arrayKeys, arrayMethods) // make array itself active
      this.observeArray(value) // make array children active
    }else {
      this.walk(value) // 
    }
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for(let i = 0, l = keys.length; i < l; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  observeArray(items) {
    for(let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}


export function observe(value, asRootData) {
  if(!isObject(value)) {
    return
  }
  let ob
  if(hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob =  value.__ob__
  }else if(Array.isArray(value) || 
            isPlainObject(value) && Object.isExtensible(value)){
    ob = new Observer(value)
  }
  if(asRootData && ob) {
    vm.vmCount ++
  }
  return ob
}

export function defineReactive(obj, key, val) {
  const dep = new Dep()
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if(property && property.configurable === false) {
    return
  }

  const getter = property && property.get
  const setter = property && property.set

  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true, 
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val
      if(Dep.target) {
        dep.depend()
        if(childOb) {
          childOb.Depend()
        }
        if(Array.isArray(value)) {
          dependArray(value)
        }
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val
      if(newVal === value) {
        return
      }
      if(setter) {
        setter.call(obj, newVal)
      }else{
        val = newVal
      }
      childOb = observe(newVal)
      dep.notify()
    }
  })
}


export function set(obj, key, val) {
  if(Array.isArray(obj) && typeof key === 'number') {
    obj.length = Math.max(obj.length, key)
    obj.splice(key, 1, val)
  }

  if(hasOwn(obj, key)) {
    obj[key] = val
    return val
  }

  const ob = obj.__ob__
  if(ob && ob.vmCount) {
    return val
  }
  if(!ob) {
    obj[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}

export function del(obj, key) {
  if(Array.isArray(obj) && typeof key === 'number') {
    obj.splice(key, 1)
    return  
  }
  if(!hasOwn(obj, key)) {
    return
  }
  const ob = obj.__ob__
  delete obj[key]
  if(!ob){
    return
  }
  ob.dep.notify()
}

function dependArray(arr) {
  for(let i = 0, l = arr.length; i < l; i++) {
    let val = arr[i]
    val && val.__ob__ && val.__ob__.dep.depend()
    if(Array.isArray(val)) {
      dependArray(val)
    }
  }
}
