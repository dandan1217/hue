import { makeMap } from 'shared/util'

const allowedGlobals = makeMap(
  'Infinity,undefined,NaN,isFinite,isNaN,' +
  'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,' +
  'encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,' +
  'Map,Set,JSON,Intl,require'
)

const warnNonPresent = (target, key) => {
  warn(
    `Property or method "${key}" is not defined on the instance but ` +
    `referenced during render. Make sure to declare reactive data ` +
    `properties in the data option.`,
    target
  )
}

const getHandler = {
  get(target, key) {
    if(typeof key === 'string' && !(key in target)){
      warnNonPresent(target, key)
    }
    return target[key]
  }
}

export function initProxy(vm) {
  vm._renderProxy = new Proxy(vm, getHandler)
}


